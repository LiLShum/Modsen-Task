import {Document, Schema} from 'mongoose';
export default interface Note extends Document {
    readonly name: string,
    readonly description: string,
    readonly tags: string[],
    readonly dateOfCreation: Date,
    readonly imageURL: string
}