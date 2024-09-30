import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from "@nestjs/swagger";

@Schema()
export class Tag {
  @ApiProperty({description: 'Тег заметки'})
  @Prop()
  name: string
}

export const TagSchema = SchemaFactory.createForClass(Tag);