import {Body, Controller, Get, Inject, Param, Post} from '@nestjs/common';
import Note from "./notes.dto";
import {NotesService} from "./notes.service";

@Controller('notes')
export class NotesController {

    constructor(@Inject() private readonly notesService: NotesService) {
    }
    @Post()
    createNote(@Body() note: Note) {
        return this.notesService.createNote(note);
    }

    @Get()
    getNotes() {
        return this.notesService.getAllNotes();
    }

    @Get(':id')
    getNoteByID(@Param('id') id) {
        return this.notesService.getNoteByID(id);
    }
}
