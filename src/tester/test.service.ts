import { Injectable } from "@nestjs/common";
import { MessageDto } from "src/dto/message.interface";

@Injectable()
export class TestService {
    constructor() { }

    sendMessage(data: any): any {
        // console.log(data);
        return {
            ok: true,
            result: {
                message_id: 54,
                from: {
                    id: 189,
                    is_bot: true,
                    first_name: "Zippity",
                    username: "zippall_bot"
                },
                chat: {
                    id: data.chat_id,
                    first_name: "Tolulope",
                    last_name: "Olagunju",
                    username: "tolu_0lagunju",
                    type: "private"
                },
                date: 1713263331,
                text: "Hey there!"
            }
        };
    }

    deleteMessage(data: any): any {
        // console.log("Deleting message:", data);
        return {
            ok: true,
            result: true
        };
    }
}