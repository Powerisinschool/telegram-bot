import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

interface ITelegramBotMessage {
  message_id: number,
  from: {
    id: number,
    is_bot: boolean,
    first_name: string,
    last_name: string,
    username: string,
    language_code: string
  },
  chat: {
    id: number,
    first_name: string,
    last_name: string,
    username: string,
    type: string
  },
  date: number,
  text?: string,
  document?: {
    file_name: string,
    mime_type: string,
    file_id: string,
    file_unique_id: string,
    file_size: number
  }
}

@Injectable()
export class AppService {
  private readonly baseUrl = 'https://api.telegram.org/bot';

  constructor(private readonly httpService: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

  webhook(@Body() { message }: { message?: ITelegramBotMessage }): string {
    if (!message) return;
    console.log('Received update:', message);
    if (message.text) {
      this.sendMessage(message.chat.id, `Received message: ${message.text}`).subscribe();
      return `Received message: ${message.text}`;
    }
    return 'New message';
  }

  sendMessage(chatId: number, text: string): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}${process.env.BOT_TOKEN}/sendMessage`;
    // const data = `chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    // return this.httpService.post(url, data);
    return this.httpService.post(url, {
      chat_id: chatId,
      text: text
    });
  }
}
