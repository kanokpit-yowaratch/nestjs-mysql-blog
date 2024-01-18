import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) { }

  create(createBlogDto: CreateBlogDto) {
    return this.blogsRepository.save(createBlogDto);
  }

  findAll(): Promise<Blog[]> {
    return this.blogsRepository.find();
  }

  findOne(id: number): Promise<Blog | null> {
    return this.blogsRepository.findOneBy({ id });
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    await this.blogsRepository.update(id, updateBlogDto);
  }

  async remove(id: number): Promise<void> {
    await this.blogsRepository.delete(id);
  }
}
