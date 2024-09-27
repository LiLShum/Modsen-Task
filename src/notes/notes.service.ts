import {Inject, Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import Note from "./notes.dto";

@Injectable()
export class NotesService {
    constructor(@Inject('NOTE_MODEL') private noteModel: Model<Note>) {
    }

    async createNote(createNote: Note) {
        const createdNote = this.noteModel.create(createNote);
        return createNote;
    }

    async getAllNotes() {
        return this.noteModel.find().exec();
    }

    async getNoteByID(id) {
        return this.noteModel.find({id: id})
    }
}
