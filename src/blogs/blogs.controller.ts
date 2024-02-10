import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Blog')
@Controller('blogs')
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'The blog has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: CreateBlogDto,
    description: 'Json structure for blog object',
  })
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createBlogDto: CreateBlogDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const fileName = file?.filename || '';
    // console.log(createBlogDto);
    createBlogDto.cover_path = fileName;
    return this.blogsService.create(createBlogDto);
  }

  @Get()
  findAll(@Query() query: any) {
    return this.blogsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogsService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'The blog has been successfully updated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @ApiBody({
    type: UpdateBlogDto,
    description: 'Json structure for blog object',
  })
  @UseInterceptors(FileInterceptor('file'))
  update(
    @Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    if (file && file?.filename) {
      const fileName = file?.filename || '';
      updateBlogDto.cover_path = fileName;
    } else {
      delete updateBlogDto['cover_path'];
    }
    return this.blogsService.update(+id, updateBlogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogsService.remove(+id);
  }

  @Get('status/:id')
  setStatus(@Param('id') id: string) {
    return this.blogsService.status(+id);
  }
}
