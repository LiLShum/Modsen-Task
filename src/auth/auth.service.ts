import { HttpException, Injectable, Res} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Response } from "express";

import CreateUserDto from "../users/dto/create-user.dto";
import { UsersService } from "../users/user.service";
import { UtilityService } from "./utilities/auth.utils";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private utilityService: UtilityService) {
  }

  async login(dto: CreateUserDto) : Promise<Object> {
    const user = await this.utilityService.validateUser(dto);
    return this.utilityService.generateToken(user);
  }

  async register(dto: CreateUserDto) : Promise<Object> {
    const candidate = await this.userService.getByLogin(dto.login)
    if (candidate) throw new HttpException('User already exists', 400);

    const hashedPassword = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userService.createUser({...dto, password: hashedPassword});

    return this.utilityService.generateToken(createdUser);
  }

  async logout(@Res() res: Response) : Promise<Object> {
    res.clearCookie('jwt');
    return res.send({
      message: 'Logged out successfully',
    });
  }
}