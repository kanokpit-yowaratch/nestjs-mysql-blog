export class CreateBlogDto {
    category_id: number;
    title: string;
    slug: string;
    description: string;
    details: string; // text
    seo_title: string;
    seo_keywords: string;
    seo_description: string;
    cover_id: number;
    count_view: number;
    related: string;
    // created_at: string;
    // updated_at: string;
    active_status: number;
    article_status: number;
}
