import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from 'src/config/configuration';
import { logger } from 'src/config/logger.config';
import { GetWebHookQueryDto } from 'src/modules/facebook/facebook.dto';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService<AppConfig>) {}

  verifyFacebookWebhook(query: GetWebHookQueryDto) {
    const secret = this.configService.get('facebook.webhookSecret', {
      infer: true,
    });
    return this.verifyToken(query, secret);
  }

  verifyInstagramWebhook(query: GetWebHookQueryDto) {
    const secret = this.configService.get('instagram.webhookSecret', {
      infer: true,
    });
    return this.verifyToken(query, secret);
  }

  private verifyToken(query: GetWebHookQueryDto, secret: string) {
    const mode = query['hub.mode'];
    const challenge = query['hub.challenge'];
    const token = query['hub.verify_token'];
    logger.info('Received GET webhook query:', query);

    const VERIFY_TOKEN = secret;

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
}
