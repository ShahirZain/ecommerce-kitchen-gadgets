import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './DTOs/Chat';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async create(@Body() createChatDto: CreateChatDto) {
    return this.chatService.create(createChatDto);
  }
  @Post('advice')
  async getEcommerceAdvice(@Body() topic: string): Promise<string> {
    return this.chatService.getEcommerceAdvice(topic);
  }
}
