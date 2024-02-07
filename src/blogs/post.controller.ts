import {
  Controller,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';

@ApiTags('Blog')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  // post/slug-something
  @Get(':slug')
  postDetail(@Param('slug') slug: string): Promise<Blog> {
    return this.postService.detail(slug);
  }

  // post/?keyword=something
  @Get()
  searchPost(@Query('keyword') keyword: string): Promise<Blog[] | []> {
    return this.postService.search(keyword);
  }
}
