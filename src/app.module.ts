import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { NotesModule } from './notes/notes.module';
import * as path from 'path';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ ServeStaticModule.forRoot({
    rootPath: path.join(path.resolve(), 'public'),
    exclude: ['/api*'],
  }),
    MongooseModule.forRoot('mongodb://localhost/modsen_test'),
    NotesModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),],
})
export class AppModule {}
