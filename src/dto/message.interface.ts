import { ApiProperty } from "@nestjs/swagger"

// export interface ITelegramBotMessage {
//     message_id: number,
//     from: {
//         id: number,
//         is_bot: boolean,
//         first_name: string,
//         last_name: string,
//         username: string,
//         language_code: string
//     },
//     chat: {
//         id: number,
//         first_name: string,
//         last_name: string,
//         username: string,
//         type: string
//     },
//     date: number,
//     text?: string,
//     document?: {
//         file_name: string,
//         mime_type: string,
//         file_id: string,
//         file_unique_id: string,
//         file_size: number
//     }
// }

export class MessageFromDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    is_bot: boolean;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    language_code: string;
}

export class MessageChatDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    first_name: string;

    @ApiProperty()
    last_name: string;

    @ApiProperty()
    username: string;

    @ApiProperty()
    type: string;
}

export class MessageDocumentDto {
    @ApiProperty()
    file_name: string;

    @ApiProperty()
    mime_type: string;

    @ApiProperty()
    file_id: string;

    @ApiProperty()
    file_unique_id: string;

    @ApiProperty()
    file_size: number;
}

export class MessageDto {
    @ApiProperty()
    message_id: number;

    @ApiProperty()
    from: MessageFromDto;

    @ApiProperty()
    chat: MessageChatDto;

    @ApiProperty()
    date: number;

    @ApiProperty()
    text?: string;

    @ApiProperty()
    document?: MessageDocumentDto;
}

export class ReturnMessageDto {
    @ApiProperty()
    ok: boolean;

    @ApiProperty()
    result: MessageDto;
}
