import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { FirebaseRepository } from './firebase/firebase.repository';

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
  private readonly helpMsg = 'Commands:\n/start - Start the bot\n/switch - Switch to an existing stream.\nUsage: /switch <your_stream_id_here>\n/done - Finish uploading files';

  constructor(private readonly httpService: HttpService,
    private firebaseRepository: FirebaseRepository
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  webhook(@Body() { message }: { message?: ITelegramBotMessage }): string {
    if (!message) return;
    console.log('Received update:', message);

    const doc = this.firebaseRepository.conversations.doc(message.chat.id.toString());
    try {
      doc.create({
        id: message.chat.id,
        first_name: message.chat.first_name,
        last_name: message.chat.last_name,
        username: message.chat.username
      })
    } catch (err) { }

    if (message.text) {
      switch (message.text) {
        case '/start':
          var existingId = doc.get();
          console.log(existingId)
          const { id } = this.startStream(message.chat.id);
          this.sendMessage(message.chat.id, `Your Stream ID id ${id}.\nUpload your files and type \`/done\` when completed!`).subscribe();
          doc.set({
            streamId: id
          });
          break;

        case '/done':
          this.sendMessage(message.chat.id, 'Thank you, will zip them now!').subscribe();
          break;

        case '/switch':
          const streamId = message.text.split(' ')[1];
          if (streamId.length !== 36) {
            this.sendMessage(message.chat.id, 'Invalid Stream ID provided');
          }
          break;
      
        default:
          this.sendMessage(message.chat.id, 'Invalid command!\n' + this.helpMsg).subscribe();
          break;
      }
      // this.sendMessage(message.chat.id, `Received message: ${message.text}`).subscribe();
      // return `Received message: ${message.text}`;
    }
    return 'This endpoint is healthy!';
  }

  startStream(chatId: number): { id: string } {
    const streamId = this.getRandomUUID();
    return {
      id: streamId
    };
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

  getRandomString(): string {
    return (Math.random() + 1).toString(36).slice(2);
  }

  getRandomUUID(): string {
    return crypto.randomUUID();
  }
}
