import { Body, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  newMessage(@Body() message: any): string {
    console.log(message);
    return 'New message';
  }
}
