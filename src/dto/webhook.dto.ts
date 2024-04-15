import { ApiProperty } from "@nestjs/swagger";
import { MessageDto } from "./message.interface";

export class WebhookDto {
    @ApiProperty()
    message: MessageDto;
}