import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import * as process from "process";

import { UsersModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from './auth.service';
import { JwtStrategy } from "./strategies/jwt.strategy";
import {UtilityService} from "./utilities/auth.utils";
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [AuthService, JwtStrategy, UtilityService],
  controllers: [AuthController],
  imports: [
    DatabaseModule,
    PassportModule.register({session: false}),
    forwardRef(()=> UsersModule),
    JwtModule.register({
      secret:  'Modsen',
      signOptions: {
        expiresIn: '24h'
      }
    })
  ],
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}