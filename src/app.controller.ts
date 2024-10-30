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
import { logger } from './config/logger.config';

@Controller('webhook')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('instagram')
  handleGetWebhook(@Query() query: GetWebHookQueryDto): string {
    const mode = query['hub.mode'];
    const challenge = query['hub.challenge'];
    const token = query['hub.verify_token'];
    logger.info(query);
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

  @Post('instagram')
  handlePostWebhook(@Body() payload: any) {
    logger.info(payload);
    return '';
  }
}
