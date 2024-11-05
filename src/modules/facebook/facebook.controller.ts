import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  OnModuleInit,
  Post,
  Query,
} from '@nestjs/common';
import { FacebookService } from './facebook.service';
import { GetWebHookQueryDto } from './facebook.dto';
import { logger } from '../../config/logger.config';
import { Comment } from '../../interfaces/comment.interface';
import { TokenService } from 'src/services/token.service';

@Controller('webhook')
export class FacebookController implements OnModuleInit {
  constructor(
    private readonly facebookService: FacebookService,
    private readonly tokenService: TokenService,
  ) {}

  @Get('facebook')
  handleGetWebhook(@Query() query: GetWebHookQueryDto): string | void {
    return this.tokenService.verifyFacebookWebhook(query);
  }

  @Post('facebook')
  async handlePostWebhook(@Body() payload: Comment) {
    logger.info(payload, 'Received POST webhook payload:');

    return '';
  }

  async onModuleInit() {}
}
