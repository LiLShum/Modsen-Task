import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export default class SearchNoteDto{
  @ApiProperty({example: 'some', description: 'Поисковый запрос'})
  @IsString()
  @MaxLength(50)
  readonly searchQuery: string;

  @ApiProperty({example: 'asc', description: 'Порядок сортировки'})
  @IsEnum(['asc', 'desc'])
  readonly sortOrder: 'asc' | 'desc';

  @ApiProperty({example: 1, description: 'Номер страницы'})
  @IsNumber()
  @Min(1)
  readonly page: number;

  @ApiProperty({example: 20, description: 'Количество заметок на одной странице'})
  @IsNumber()
  @Max(200)
  @Min(1)
  readonly limit: number;

  @ApiProperty({example: 'new', description: 'Искомый тег'})
  @IsString()
  @MaxLength(50)
  readonly filter: string;
}