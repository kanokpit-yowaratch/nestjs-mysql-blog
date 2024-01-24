import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  category_id: number;

  @ApiProperty({
    example: 'Swimming at the Sea',
    required: true
 })
  title: string;

  slug: string;
  description: string;
  details: string; // text
  seo_title: string;
  seo_keywords: string;
  seo_description: string;
  
  @ApiProperty({
    example: 'cover-blog-file-name.jpg',
    required: false
 })
  cover_path: string;

  count_view: number;
  related: string;
  // created_at: string;
  // updated_at: string;
  active_status: number;
  article_status: number;
}
