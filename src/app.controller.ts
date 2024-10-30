import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { GetWebHookQueryDto } from './dto';

@Controller('webhook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('whatsapp')
  handleGetWebhook(@Query() query: GetWebHookQueryDto): string {
    const mode = query['hub.mode'];
    const challenge = query['hub.challenge'];
    const token = query['hub.verify_token'];

    if (mode && token) {
      if (mode === 'subscribe' && token === 'verifyTokenSecret') {
        return challenge;
      } else {
        throw new HttpException('Invalid verify token', 403);
      }
    } else {
      return;
    }
  }

  @Post('whatsapp')
  handlePostWebhook(@Body() payload: any) {
    return payload;
  }
}
