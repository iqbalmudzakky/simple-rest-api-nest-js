import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import { Post as PostModel } from './post.model';
import { User as UserModel } from 'src/users/user.model';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(PostModel)
    private postModel: typeof PostModel,
  ) {}

  async create(dto: CreatePostDto) {
    await this.postModel.create(dto);
    return { message: 'Post created successfully' };
  }

  async findAll() {
    return this.postModel.findAll({
      attributes: { exclude: ['userId'] },
      include: [
        {
          model: UserModel,
          as: 'user',
          attributes: ['name'],
        },
      ],
    });
  }
}
