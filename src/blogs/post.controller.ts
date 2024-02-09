import {
  Controller,
  BadRequestException,
  Get,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { Request } from 'express';
import { PostWithPagination } from './page.interface';

@ApiTags('Blog')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get('pg')
  async getPostsWithPagination(@Body() formData: Request): Promise<PostWithPagination> {
    const page = parseInt(formData['page'] as string) - 1;
    const limit = parseInt(formData['rowsPerPage'] as string);
    const keyword = formData['keyword'] || '';

    if (isNaN(page) || page < 0) {
      throw new BadRequestException('Invalid current page.');
    }

    if (isNaN(limit) || limit < 0) {
      throw new BadRequestException('Invalid rows per page.');
    } else if (limit > 100) {
      throw new BadRequestException('Rows per page max size is 100.');
    }

    const offset = page * limit;
    const conditionPaging = { page, limit, offset };

    return await this.postService.findAllActive(conditionPaging, keyword);
  }

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
