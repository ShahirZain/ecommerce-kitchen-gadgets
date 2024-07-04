import { Injectable } from '@nestjs/common';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { Ollama } from '@langchain/community/llms/ollama';
import { CreateChatDto } from './DTOs/Chat';

@Injectable()
export class ChatService {
  private readonly ollama: Ollama;
  private readonly promptTemplate: ChatPromptTemplate;

  constructor() {
    this.ollama = new Ollama({
      baseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
      model: process.env.OLLAMA_MODEL || 'llama3',
      temperature: 0.9,
    });
    this.promptTemplate = ChatPromptTemplate.fromMessages([
      ['system', 'You are an expert in eCommerce for kitchen gadgets.'],
      ['user', 'Can you provide advice on {topic}?'],
    ]);
  }

  async create(createChatDto: CreateChatDto) {
    const { prompt } = createChatDto;
    const stream = await this.ollama.stream(prompt);

    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const response = chunks.join('').trim();

    return response;
  }

  async getEcommerceAdvice(topic: string) {
    // Generate the prompt message
    const prompt = await this.promptTemplate.format({
      topic,
    });

    // Use the LLM model to get the response
    const stream = await this.ollama.stream(prompt);
    const chunks = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }

    const response = chunks.join('').trim();

    return response;
  }
}
