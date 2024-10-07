import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { User } from "../schemas/user.schema";
import CreateUserDto from "./dto/create-user.dto";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(dto: CreateUserDto, googleId = '') : Promise<User> {
    const newUser = new this.userModel(dto);
    if(googleId) newUser.googleId = googleId;
    return newUser.save();
  }

  async getByLogin(login: string): Promise<User>{
    return this.userModel.findOne({login}).exec();
  }
}