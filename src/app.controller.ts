import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // default here
  getAmazingWorld(): string {
    return this.appService.getAmazing();
  }

  @Get('/hello') // need /hello
  getHello(): string {
    return this.appService.getHello();
  }
  
  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return file;
  }
}
