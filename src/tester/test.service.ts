import { Injectable } from "@nestjs/common";
import { MessageDto } from "src/dto/message.interface";

@Injectable()
export class TestService {
    constructor() { }

    sendMessage(data: any): MessageDto {
        console.log(data);
        return {
            message_id: 54,
            from: {
                id: 789,
                first_name: "string",
                last_name: "string",
                is_bot: false,
                language_code: "EN",
                username: "string",
            },
            chat: {
                id: 789,
                first_name: "string",
                last_name: "string",
                type: "text",
                username: "string",
            },
            date: Date.now().valueOf(),
            text: "text",
        };
    }

    deleteMessage(data: any): string {
        console.log("Deleting message:", data);
        return 'message deleted';
    }
}