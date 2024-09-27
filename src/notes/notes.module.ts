import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {NotesController} from "./notes.controller";
import {NotesService} from "./notes.service";
import {notesProviders} from "./notes.providers";
import {databaseProviders} from "../database/database.providers";

@Module({
    imports: [DatabaseModule],
    controllers: [NotesController],
    providers: [NotesService, ...notesProviders, ]
})
export class NotesModule {}
