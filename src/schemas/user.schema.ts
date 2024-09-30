  import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
  import { ApiProperty } from "@nestjs/swagger";
  import { IsOptional } from "class-validator";
  import mongoose from 'mongoose';

  import { Note } from './note.schema';

  @Schema()
  export class User {
    @ApiProperty({example: 'someUser', description: 'Логин пользователя'})
    @Prop({required:true, unique:true})
    login: string;

    @ApiProperty({example: '123', description: 'Пароль пользователя'})
    @Prop()
    password: string;

    @ApiProperty({example: '391274239232', description: 'Идентификатор пользователя Google'})
    @IsOptional()
    @Prop()
    googleId: string;

    @ApiProperty({description: 'Созданные пользователем заметки'})
    @Prop({type:[{type: mongoose.Schema.Types.ObjectId, ref:'Note'}]})
    notes: Note[];
  }

  export const UserSchema = SchemaFactory.createForClass(User);