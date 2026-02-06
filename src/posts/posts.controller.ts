import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() dto: CreatePostDto, @Req() req) {
    const userId = req.user.userId;
    return this.postsService.create({ ...dto, userId });
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }
}
