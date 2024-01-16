import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

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
}
