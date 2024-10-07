import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../schemas/user.schema";
import { UsersController } from './user.controller';
import { UsersService } from './user.service';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports:[
    DatabaseModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}