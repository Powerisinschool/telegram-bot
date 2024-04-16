import { HttpService } from '@nestjs/axios';
import { Body, Injectable } from '@nestjs/common';
import { AxiosError, AxiosResponse } from 'axios';
import { Observable, catchError, firstValueFrom } from 'rxjs';
import { MessageDto, ReturnMessageDto } from './dto/message.interface';
// import { FirebaseRepository } from './firebase/firebase.repository';
import { UserService } from './user/user.service';
import { User } from './entities/user.entity';

@Injectable()
export class AppService {
  private readonly baseUrl = process.env.DEVELOPMENT ? 'http://localhost:3000/testBot' : 'https://api.telegram.org/bot';
  private readonly helpMsg = 'Commands:\n<code>/start</code> - Start the bot\n<code>/switch</code> - Switch to an existing stream.\nUsage: <code>/switch <your_stream_id_here></code>\n<code>/done</code> - Finish uploading files';

  constructor(
    private readonly httpService: HttpService,
    private userService: UserService,
    // private firebaseRepository: FirebaseRepository
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  async webhook(@Body() { message }: { message?: MessageDto }): Promise<string> {
    if (!message) return;
    console.log('Received update:', message);

    const tempMessage = await this.sendTempMessage(message.chat.id, "<bold>Processing...</bold>");
    const user = await this.userService.findOne(message.from.id);
    if (!user) {
      console.log("Not Existing!!!");
      this.userService.createUser(new User(message.from.id, message.from.first_name, message.from.last_name, message.from.username));
    }

    if (message.text) {
      switch (message.text) {
        case '/start':
          const { id } = this.startStream(message.chat.id);
          this.sendMessage(message.chat.id, `Your Stream ID id ${id}.\nUpload your files and type \`/done\` when completed!`);
          break;

        case '/done':
          this.sendMessage(message.chat.id, 'Thank you, will zip them now!');
          break;

        case '/switch':
          const streamId = message.text.split(' ')[1];
          if (streamId.length !== 36) {
            this.sendMessage(message.chat.id, 'Invalid Stream ID provided');
          }
          break;

        default:
          this.sendMessage(message.chat.id, 'Invalid command!\n' + this.helpMsg);
          break;
      }
    }
    console.log(tempMessage);
    this.deleteMessage(tempMessage.chat.id, tempMessage.message_id);
    return 'This endpoint is healthy!';
  }

  async sendTempMessage(chatId: number, text: string, timeout: number = -1): Promise<MessageDto> {
    const url = `${this.baseUrl}${process.env.BOT_TOKEN}/sendMessage`;
    console.log("Sending a temporary message to", url);
    const { data } = await firstValueFrom(
        this.httpService.post<ReturnMessageDto>(url, {
          chat_id: chatId,
          text: text,
          disable_notification: true,
          protect_content: true,
          parse_mode: "HTML",
        }).pipe(
          catchError((error: AxiosError) => {
            throw 'An error happened with Axios!';
          }),
        ),
    );
    if (!data.ok) {
      throw 'An error happened with Telegram!';
    }
    if (timeout > 0) {
      setTimeout(() => {
        this.deleteMessage(data.result.chat.id, data.result.message_id);
      }, timeout);
    };
    return data.result;
  }

  // this.httpService.post(url, {
  //   chat_id: chatId,
  //   text: text,
  //   disable_notification: true,
  //   protect_content: true,
  //   parse_mode: "HTML",
  // }).subscribe(response => {
  //   const message = (response.data);
  //   if (timeout > 0) {
  //     setTimeout(() => {
  //       this.deleteMessage(message.chat.id, message.message_id);
  //     }, timeout);
  //   }
  // })

  startStream(chatId: number): { id: string } {
    const streamId = this.getRandomUUID();
    return {
      id: streamId
    };
  }

  sendMessage(chatId: number, text: string): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}${process.env.BOT_TOKEN}/sendMessage`;
    console.log("Sending standard message to", url);
    console.log("Sent Message:", {
      chatId,
      text,
      parseMode: "HTML",
    });
    return this.httpService.post(url, {
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
    });
  }

  deleteMessage(chatId: number, messageId: number): Observable<AxiosResponse<any>> {
    const url = `${this.baseUrl}${process.env.BOT_TOKEN}/deleteMessage`;
    return this.httpService.post(url, {
      chat_id: chatId,
      message_id: messageId
    });
  }

  getRandomString(): string {
    return (Math.random() + 1).toString(36).slice(2);
  }

  getRandomUUID(): string {
    return crypto.randomUUID();
  }
}
