import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req, Res, UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from 'express';
import { DeleteResult } from "mongodb";
import { v4 as uuidv4 } from 'uuid';

import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { Note } from "../schemas/note.schema";
import { TagsService } from "../tags/tags.service";
import CreateNoteDto from "./dto/create-note.dto";
import { NotesService } from "./notes.service";

@ApiTags('Заметки')
@Controller('notes')
export class NotesController {
    constructor(private notesService: NotesService,
                private tagsService: TagsService) {}

    @ApiOperation({summary: 'Получение заметок пользователя'})
    @ApiResponse({status: 200, type: [Note]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAllNotes(
      @Req() req,
      @Query('search') search: string = '',
      @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc',
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
      @Query('filter') filter: string = '',
    ): Promise<Note[]>{
        const userId = req.user.userId;
        return this.notesService.findAll(
          userId,
          {searchQuery: search, filter, sortOrder, limit, page}
        );
    }

    @ApiOperation({summary: 'Получение заметки по индентификатору'})
    @ApiResponse({status: 200, type: Note})
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOneNote(@Param('id') id: string): Promise<Note>{
        return this.notesService.find(id);
    }

    @ApiOperation({summary: 'Создание заметки'})
    @ApiResponse({status: 200, type: Note})
    @UseGuards(JwtAuthGuard)
    @Post()
    async createNote(@Req() req, @Body() noteDto: CreateNoteDto): Promise<Note>{
        const user = req.user;

        let tags = noteDto.tags;
        if(typeof tags == 'string'){
            tags = tags.split(',')
              .map(tag => {
                  return { name: tag.trim() }
              })
        }
        let existingTags = await this.tagsService.findAll();
        tags.forEach(tag => {
            if(!existingTags.includes(tag)){
                this.tagsService.createTag(tag.name);
            }
        });

        const defaultLocation: string = new Date().toLocaleString();
        return this.notesService.createNote({
            ...noteDto,
            tags,
            location: noteDto.location != "" ? noteDto.location : defaultLocation,
        }, user.userId);
    }

    @ApiOperation({summary: 'Редактирование заметки'})
    @ApiResponse({status: 200, type: Note})
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    editNote(@Param('id') id: string, @Body() noteDto: CreateNoteDto){
        return this.notesService.editNote(id, noteDto);
    }

    @ApiOperation({summary: 'Удаление заметки'})
    @ApiResponse({status: 200, type: Note})
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deleteNote(@Param('id') id: string): Promise<DeleteResult>{
        return this.notesService.deleteNote(id);
    }

    @Get(':id/img')
    async getImage(@Param('id') id: string, @Res() res: Response){
        const imageUrl = await this.notesService.getImage(id);

        if (!imageUrl) {
            return res.status(404).send('Image not found');
        }

        return res.send(imageUrl);
    }
}