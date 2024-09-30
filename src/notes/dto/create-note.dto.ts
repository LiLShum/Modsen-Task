import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

import { Tag } from "../../schemas/tag.schema";

export default class CreateNoteDto {
    @ApiProperty({example: 'someTitle', description: 'Заголовок заметки'})
    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    readonly title: string;

    @ApiProperty({example: 'someDescription', description: 'Описание заметки'})
    @IsString()
    @MaxLength(1000)
    @IsNotEmpty()
    readonly description: string;

    @ApiProperty({example: 'https://somePhoto/1.jpg', description: 'Ссылка на вложенное изображение'})
    @IsString()
    @MaxLength(200)
    readonly imgUrl: string | null;

    @ApiProperty({example: 'Минск, Минская область, Беларусь 30.11.2024, 08:10:32', description: 'Данные о геопозиции и времени создания'})
    @IsString()
    @MaxLength(100)
    readonly location: string | null;

    @ApiProperty({example: [{name: 'someTag'}, {name: 'anotherTag'}], description: 'Набор тегов'})
    @IsArray()
    readonly tags: Tag[] | string | null;
}