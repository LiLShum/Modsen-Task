import * as mongoose from 'mongoose';
import {Schema} from "mongoose";
import { v4 as uuidv4 } from "uuid";


export const NoteSchema = new mongoose.Schema({
    noteID: {
        type: mongoose.Schema.Types.UUID,
        default: () => uuidv4(),
    },
    name: String,
    description: String,
    tags: [String],
    dateOfCreation: Date,
    imageURL: String
});