import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('new-message')
  @Header('Cache-Control', 'none')
  webhook(@Req() request: Request, @Body() message: any): string {
    return this.appService.webhook(message);
  }
}
