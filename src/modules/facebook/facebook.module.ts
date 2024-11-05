import { Module } from '@nestjs/common';
import { FacebookController } from './facebook.controller';
import { FacebookService } from './facebook.service';
import { TokenService } from 'src/services/token.service';

@Module({
  controllers: [FacebookController],
  providers: [FacebookService, TokenService],
})
export class FacebookModule {}
