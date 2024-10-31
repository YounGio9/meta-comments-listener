import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
  handleGetWebhook(@Query() query: GetWebHookQueryDto): string | void {
    const mode = query['hub.mode'];
    const challenge = query['hub.challenge'];
    const token = query['hub.verify_token'];
    logger.info('Received GET webhook query:', query);

    const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'verifyTokenSecret';

    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        logger.info('Webhook verified');
        return challenge;
      } else {
        logger.warn('Invalid verify token');
        throw new HttpException('Invalid verify token', HttpStatus.FORBIDDEN);
      }
    }
  }

  @Post('instagram')
  handlePostWebhook(@Body() payload: any): string {
    logger.info(payload, 'Received Instagram POST webhook payload:');
    return '';
  }
}
