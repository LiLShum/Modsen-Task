import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { Types } from 'mongoose';
import { Tag } from "./tag.schema";
import { User } from './user.schema';

@Schema()
export class Note {
    @ApiProperty({example: 'someTitle', description: 'Заголовок заметки'})
    @Prop({required:true})
    title: string;

    @ApiProperty({example: 'someDescription', description: 'Описание заметки'})
    @Prop({required:true})
    description: string;

    @ApiProperty({example: [{name: 'new'}, {name: 'public'}], description: 'теги'})
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Tag' }] })
    tags: Tag[];

    @ApiProperty({example: 'Беларусь 23.09.2024, 22:19:04', description: 'Данные о геолокации и времени создания'})
    @Prop()
    location: string

    @ApiProperty({example: 'https://img/img.jpg', description: 'Ссылка на изображение'})
    @Prop()
    imgUrl: string

    @ApiProperty({description: 'Создатель заметки'})
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: "User", required: true})
    owner: User
}

export const NoteSchema = SchemaFactory.createForClass(Note);