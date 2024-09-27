
import {Connection, Mongoose} from 'mongoose';
import { NoteSchema } from "../schemas/note.schema";

export const notesProviders = [
    {
        provide: 'NOTE_MODEL',
        useFactory: (mongoose: Mongoose) => mongoose.model('Note', NoteSchema),
        inject: ['DATABASE_CONNECTION'],
    },
];
