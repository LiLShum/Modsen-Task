import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DeleteResult } from "mongodb";
import { Model } from 'mongoose';

import { Note } from '../schemas/note.schema';
import { User } from "../schemas/user.schema";
import CreateNoteDto from "./dto/create-note.dto";
import SearchNoteDto from "./dto/search-note.dto";
import { Tag } from '../schemas/tag.schema';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<Note>,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async findAll(userId: string, query: SearchNoteDto): Promise<Note[]> {
    const {searchQuery,
      sortOrder,
      page,
      limit,
      filter} = query;

    const filters = {
      $or: [
        { title: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } }
      ],
    };

    if (filter) {
      const tag = await this.tagModel.findOne({ name: filter }).exec();
      if (tag) {
        Object.assign(filters, { tags: tag._id });
      }
    }

    const skip = (page - 1) * limit;
    return this.noteModel.find({ tags: filter })
      .sort({title: sortOrder === 'asc' ? 1 : -1})
      .skip(skip)
      .limit(limit)
      .exec();
  }

  async find(id: string): Promise<Note> {
    return this.noteModel.findById(id).exec();
  }

  async createNote(dto: CreateNoteDto, ownerId: string): Promise<Note>{
    const newNote = await new this.noteModel({...dto, owner: ownerId});
    return newNote.save();
  }

  async editNote(id: string, dto: CreateNoteDto){
    return this.noteModel.updateOne({_id: id}, dto).exec();
  }

  async deleteNote(id: string): Promise<DeleteResult>{
    return this.noteModel.deleteOne({_id: id}).exec();
  }

  async getImage(id: string){
    return (await this.find(id)).imgUrl
  }
}