import { Module } from '@nestjs/common';
import { InstagramService } from '../instagram/instagram.service';
import { FacebookService } from '../facebook/facebook.service';
import { LikeController } from './like.controller';

@Module({
  controllers: [LikeController],
  providers: [InstagramService, FacebookService],
})
export class LikeModule {}
