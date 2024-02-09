import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Brackets, Repository } from 'typeorm';
import { Pagination, PostWithPagination } from './page.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) { }

  async findAllActive(page: Pagination, keyword: string): Promise<PostWithPagination> {
    const take = page.limit || 10
    const skip = page.offset || 0

    const result = this.blogsRepository.createQueryBuilder('blog')
      .where("blog.active_status = :active_status", { active_status: 0 });

    if (keyword) {
      result
        .andWhere(
          new Brackets((qb) => {
            qb.where("blog.title LIKE :keyword", { keyword: `%${keyword}%` })
              .orWhere("blog.description LIKE :keyword", { keyword: `%${keyword}%` })
          }),
        );
    }

    const tempResult = await result.take(take).skip(skip).getMany();

    return {
      data: tempResult,
      count: tempResult.length,
      page: (page.page + 1),
      limit: page.limit,
      offset: page.offset
    }
  }

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
