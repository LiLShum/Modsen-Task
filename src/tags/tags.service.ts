import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Tag } from '../schemas/tag.schema';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<Tag>) {}

  async findAll(): Promise<Tag[]> {
    return this.tagModel.find().exec();
  }

  async createTag(name: string): Promise<Tag> {
    const newTag = new this.tagModel({ name });
    return newTag.save();
  }
}