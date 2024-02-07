import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) { }

  async detail(slug: string): Promise<Blog | null> {
    const post = await this.blogsRepository.findOne({ where: { slug: slug } });
    return post;
  }

  async search(keyword: string): Promise<Blog[] | []> {
    const posts = await this.blogsRepository.createQueryBuilder('blog')
      .where('blog.title like :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('blog.description like :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('blog.details like :keyword', {
        keyword: `%${keyword}%`,
      })
      .getMany();
    return posts
  }
}
