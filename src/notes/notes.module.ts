import { Module } from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {NotesController} from "./notes.controller";
import {NotesService} from "./notes.service";
import {notesProviders} from "./notes.providers";
import {databaseProviders} from "../database/database.providers";
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from '../schemas/note.schema';
import { UsersModule } from '../users/user.module';
import { User, UserSchema } from '../schemas/user.schema';
import { TagsService } from '../tags/tags.service';
import { Tag, TagSchema } from '../schemas/tag.schema';

@Module({
    imports: [DatabaseModule, UsersModule, MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema },
        { name: User.name, schema: UserSchema },
        {name: Tag.name, schema: TagSchema}]),],
    controllers: [NotesController],
    providers: [NotesService, ...notesProviders, TagsService],
    exports: [NotesService]
})
export class NotesModule {}
