import { Body, Controller, Get, Post } from "@nestjs/common";
import { TestService } from "./test.service";
import { MessageDto } from "src/dto/message.interface";

@Controller('testBot:id')
export class TestController {
    constructor(private readonly testService: TestService) { }

    @Get()
    displayMessage() {
        return 'this is the test bot!'
    }

    @Post('sendMessage')
    sendMessage(@Body() data: any): any {
        return this.testService.sendMessage(data);
    }

    @Post('deleteMessage')
    deleteMessage(@Body() data: any): string {
        return this.testService.deleteMessage(data);
    }
}