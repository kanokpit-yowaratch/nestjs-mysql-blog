import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category_id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column()
  details: string;

  @Column()
  seo_title: string;

  @Column()
  seo_keywords: string;

  @Column()
  seo_description: string;

  @Column()
  cover_id: number;

  @Column()
  count_view: number;

  @Column()
  related: string;

  // Not need for date first
  // @Column({ type: 'timestamptz' }) // Recommended
  // date_time_with_timezone: Date;

  // @Column({ type: 'date' })
  // created_at: string;

  // @Column({ type: 'date' })
  // updated_at: string;

  @Column()
  active_status: number;

  @Column()
  article_status: number;
}
