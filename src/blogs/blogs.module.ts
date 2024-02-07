import { HttpException, HttpStatus, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsService } from './blogs.service';
import { PostService } from './post.service';
import { BlogsController } from './blogs.controller';
import { PostController } from './post.controller';
import { Blog } from './entities/blog.entity';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuid } from 'uuid';
import { MulterModule } from '@nestjs/platform-express';

export const multerOptions = {
  limits: {
    fileSize: 1024 * 1024 * 10,
  },

  fileFilter: (req: any, file: any, cb: any) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif|pdf)$/)) {
      cb(null, true);
    } else {
      cb(
        new HttpException(
          `Unsupported file type ${extname(file.originalname)}`,
          HttpStatus.BAD_REQUEST,
        ),
        false,
      );
    }
  },

  storage: diskStorage({
    destination: 'uploads/',

    filename: (req: any, file: any, cb: any) => {
      cb(null, `${uuid()}${extname(file.originalname)}`);
    },
  }),
};

@Module({
  imports: [
    TypeOrmModule.forFeature([Blog]),
    MulterModule.register(multerOptions),
  ],
  controllers: [BlogsController, PostController],
  providers: [BlogsService, PostService],
})
export class BlogsModule { }
