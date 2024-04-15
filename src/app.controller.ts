import { Body, Controller, Get, Header, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { WebhookDto } from './dto/webhook.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webhook')
  @Header('Cache-Control', 'none')
  async webhook(@Body() data: WebhookDto ): Promise<string> {
    return this.appService.webhook(data);
  }

  @Get('random')
  getRandom(): string {
    return this.appService.getRandomString();
  }
}
