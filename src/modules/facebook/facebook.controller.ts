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
import {
  Comment,
  CommentValue,
  MediaValue,
} from '../../interfaces/comment.interface';

@Controller('webhook')
export class FacebookController implements OnModuleInit {
  constructor(private readonly facebookService: FacebookService) {}

  @Get('facebook')
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

  @Post('facebook')
  async handlePostWebhook(@Body() payload: Comment) {
    logger.info(payload, 'Received POST webhook payload:');

    if (payload.object == 'facebook') {
      // if (payload.entry[0].changes[0].field == 'comments') {
      //   const comment = payload.entry[0].changes[0].value as CommentValue;
      //   const result: CommentValue & { media?: any } =
      //     await this.facebookService.resolveParentComment(comment);
      //   result.media = await this.facebookService.getMedia(comment.media.id);
      //   logger.info(result, 'New comment');
      // }
      // if (payload.entry[0].changes[0].field == 'mentions') {
      //   const media = payload.entry[0].changes[0].value as MediaValue;
      //   const result: MediaValue & { media?: any; comment?: any } = media;
      //   result.media = await this.facebookService.getMedia(media.media_id);
      //   result.comment = await this.facebookService.getComment(
      //     media.comment_id,
      //   );
      //   result.comment = await this.facebookService.resolveParentComment(
      //     result.comment,
      //   );
      //   logger.info(result, 'New mention');
      // }
    }
    return '';
  }

  async onModuleInit() {
    //   logger.info(
    //     await this.facebookService.commentOnPost({
    //       commentId: '',
    //       text: '',
    //     }),
    //   );
  }
}
