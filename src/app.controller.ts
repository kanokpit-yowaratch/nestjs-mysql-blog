import { Controller, Get, Param, Res, StreamableFile } from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get() // default here
  getAmazingWorld(): string {
    return this.appService.getAmazing();
  }

  @Get('/hello') // need /hello
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('medias/:file_name')
  display(@Res() res, @Param('file_name') fileName: string) {
    res.sendFile(fileName, { root: './uploads' })
  }

  @Get('download/:file_name')
  download(@Param('file_name') fileName: string): StreamableFile {
    const file = createReadStream(join(process.cwd(), `uploads/${fileName}`));
    return new StreamableFile(file);
  }
}
