import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { User } from "../schemas/user.schema";
import CreateUserDto from "./dto/create-user.dto";
import { UsersService } from "./user.service";

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @ApiOperation({summary: 'Создание нового пользователя'})
  @ApiResponse({status: 200, type: User})
  @Post()
  createUser(@Body() dto: CreateUserDto){
    return this.usersService.createUser(dto);
  }
}