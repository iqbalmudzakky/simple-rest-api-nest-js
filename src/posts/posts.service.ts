import { Injectable } from '@nestjs/common';
import { Post as PostModel } from './post.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel)
    private postModel: typeof PostModel,
  ) {}

  async create(dto: CreatePostDto) {
    return this.postModel.create(dto);
  }

  async findAll() {
    return this.postModel.findAll({ include: { all: true } });
  }
}
