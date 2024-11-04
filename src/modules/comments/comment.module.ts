import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { InstagramService } from '../instagram/instagram.service';

@Module({
  controllers: [CommentController],
  providers: [InstagramService],
})
export class CommentModule {}
