import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { InstagramService } from '../instagram/instagram.service';
import { FacebookService } from '../facebook/facebook.service';

@Module({
  controllers: [CommentController],
  providers: [InstagramService, FacebookService],
})
export class CommentModule {}
