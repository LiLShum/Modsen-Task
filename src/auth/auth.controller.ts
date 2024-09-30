import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Response } from "express";

import CreateUserDto from "../users/dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Tokens } from "../tokens/tokens";

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({summary: 'Авторизация пользователя'})
  @ApiResponse({status: 200, type: Tokens})
  @Post('login')
  async login(@Body() dto: CreateUserDto, @Res() res: Response){
    if(!dto.login) throw new BadRequestException('Login or password is missing');
    const tokens: {accessToken: string, refreshToken: string} = await this.authService.login(dto);
    res.cookie('jwt', tokens.accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000
    });
    res.send(tokens);
  }

  @ApiOperation({summary: 'Регистрация пользователя'})
  @ApiResponse({status: 200, type: Tokens})
  @Post('registration')
  register(@Body() dto: CreateUserDto){
    if(!(dto.login && dto.password)) throw new BadRequestException('Login or password is missing');
    return this.authService.register(dto);
  }

  @ApiOperation({summary: 'Выход из учетной записи'})
  @ApiResponse({status: 200, type: Object})
  @Get('logout')
  async logOut(@Res() res){
    return this.authService.logout(res);
  }

}