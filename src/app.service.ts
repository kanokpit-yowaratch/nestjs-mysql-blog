import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAmazing(): string {
    let welcomeMessage = '<h4>All API:</h4>';
    welcomeMessage += `<ul>`;
    welcomeMessage += `<li><a href="/hello">/hello</a> (GET)</li>`;
    welcomeMessage += `<li><a href="/blogs">/blogs</a> (GET, POST)</li>`;
    welcomeMessage += `<li><a href="/blogs/1">/blogs/:id</a> (GET)</li>`;
    welcomeMessage += `<li>/blogs/:id (PATCH)</li>`;
    welcomeMessage += `<li>/blogs/:id (DELETE)</li>`;
    welcomeMessage += `<li>/upload (POST)</li>`;
    welcomeMessage += `</ul>`;
    return welcomeMessage;
  }
}
