import {Injectable, UnauthorizedException} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import * as process from "process";

import { User } from '../../schemas/user.schema'
import CreateUserDto from "../../users/dto/create-user.dto";
import {UsersService} from "../../users/user.service";

@Injectable()
export class UtilityService{
  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  async validateUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userService.getByLogin(dto.login);
    if(!user)
      throw new UnauthorizedException({message: 'User not found'});
    if (user.googleId)
      throw new UnauthorizedException({message: 'User authorized from google. Please use external authorization to continue'});
    if (user && dto.password && bcrypt.compareSync(dto.password, user.password)) {
      return user;
    }
    throw new UnauthorizedException({message: 'Incorrect email or password'});
  }
  async generateToken(user) {
    const payload = { login: user.login, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { secret: 'Modsen', expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { secret: 'Modsen', expiresIn: '1d' });
    return {
      accessToken, refreshToken
    };
  }

}