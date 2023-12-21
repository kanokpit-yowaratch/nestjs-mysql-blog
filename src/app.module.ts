import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { TypeOrmModule } from '@nestjs/typeorm';
require('dotenv').config();

const connection = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    "dist/**/*.entity{.ts,.js}"
  ],
  synchronize: true
};

@Module({
  //@ts-ignore
  imports: [TypeOrmModule.forRoot(connection), BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
