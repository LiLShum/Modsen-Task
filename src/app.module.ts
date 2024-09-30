import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NotesModule } from './notes/notes.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import * as process from "process";
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: path.join(path.resolve(), 'public'),
    exclude: ['/api*']
  }),
    MongooseModule.forRoot('mongodb://localhost/modsen_test'),
    NotesModule,
    UsersModule,
    AuthModule,],
})
export class AppModule {}
