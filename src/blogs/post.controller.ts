import {
  Controller,
  BadRequestException,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { ApiTags } from '@nestjs/swagger';
import { Blog } from './entities/blog.entity';
import { PageCondition, PostWithPagination } from './page.interface';

@ApiTags('Blog')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  createPageCondition(query: any): PageCondition {
    const page = query.page ? parseInt(query.page as string) - 1 : 0;
    const limit = query.rowsPerPage ? parseInt(query.rowsPerPage as string) : 5;

    if (isNaN(page) || page < 0) {
      throw new BadRequestException('Invalid current page.');
    }

    if (isNaN(limit) || limit < 0) {
      throw new BadRequestException('Invalid rows per page.');
    } else if (limit > 100) {
      throw new BadRequestException('Rows per page max size is 100.');
    }

    const offset = page * limit;
    return { page, limit, offset }
  }

  @Get()
  async page(@Query() query: any): Promise<PostWithPagination> {
    const conditionPaging = this.createPageCondition(query);
    const keyword = query.keyword || '';
    return await this.postService.findAllActive(conditionPaging, keyword);
  }

  // post/slug-something
  @Get(':slug')
  postDetail(@Param('slug') slug: string): Promise<Blog> {
    return this.postService.detail(slug);
  }
}
