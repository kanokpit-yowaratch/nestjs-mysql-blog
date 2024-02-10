import { Blog } from "./entities/blog.entity";

export interface PageCondition {
    page: number;
    limit: number;
    offset: number;
}

export interface PostWithPagination extends PageCondition {
    data: Blog[];
    count: number;
    totalPage: number;
}
