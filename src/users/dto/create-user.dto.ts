import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateUserDto {
  @ApiProperty({example: 'someUser', description: 'Логин'})
  @IsString()
  @IsNotEmpty()
  readonly login: string;

  @ApiProperty({example: '123', description: 'Пароль'})
  @IsString()
  readonly password: string;
}