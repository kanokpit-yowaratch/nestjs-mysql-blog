import { Blog } from "./entities/blog.entity";

export interface Pagination {
    page: number;
    limit: number;
    offset: number;
}

export interface PostWithPagination extends Pagination {
    data: Blog[];
    count: number;
}
