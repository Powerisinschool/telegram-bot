import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webhook')
  @Header('Cache-Control', 'none')
  async webhook(@Req() request: Request, @Body() message: any): Promise<string> {
    return this.appService.webhook(message);
  }

  @Get('random')
  getRandom(): string {
    return this.appService.getRandomString();
  }
}
