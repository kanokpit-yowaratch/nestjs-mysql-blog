import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Brackets, Repository } from 'typeorm';
import { PageCondition, PostWithPagination } from './page.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Blog)
    private blogsRepository: Repository<Blog>,
  ) { }

  async findAllActive(page: PageCondition, keyword: string): Promise<PostWithPagination> {
    const take = page.limit || 10
    const skip = page.offset || 0

    const result = this.blogsRepository.createQueryBuilder('blog')
      .where("blog.active_status = :active_status", { active_status: 1 });

    if (keyword) {
      result
        .andWhere(
          new Brackets((qb) => {
            qb.where("blog.title LIKE :keyword", { keyword: `%${keyword}%` })
              .orWhere("blog.description LIKE :keyword", { keyword: `%${keyword}%` })
          }),
        );
    }

    const totalData = (await result.getMany()).length;
    const pageData = await result.take(take).skip(skip).getMany();
    const totalPage = Math.ceil(totalData / page.limit);

    return {
      data: pageData,
      count: totalData,
      page: (page.page + 1),
      limit: page.limit,
      offset: page.offset,
      totalPage: totalPage
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
