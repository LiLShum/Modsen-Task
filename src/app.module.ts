import { Module } from '@nestjs/common';
import { NotesController } from './notes/notes.controller';
import { NotesModule } from './notes/notes.module';
import {NotesService} from "./notes/notes.service";
import {DatabaseModule} from "./database/database.module";
@Module({
  imports: [NotesModule],
})
export class AppModule {}
