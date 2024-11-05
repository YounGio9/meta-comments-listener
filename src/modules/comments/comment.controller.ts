import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { InstagramService } from '../instagram/instagram.service';
import { ReplyDto } from '../instagram/instagram.dto';
import { FacebookService } from '../facebook/facebook.service';
import { FBCommentDto } from '../facebook/facebook.dto';

@Controller('comments')
export class CommentController implements OnModuleInit {
  constructor(
    private readonly instagramService: InstagramService,
    private readonly facebookService: FacebookService,
  ) {}

  @Post('instagram/reply')
  handleReplyToIGComment(@Body() payload: ReplyDto) {
    return this.instagramService.reply(payload);
  }

  @Post('facebook/comment')
  handleCommentOnPost(@Body() payload: FBCommentDto) {
    return this.facebookService.commentOnPost(payload);
  }

  async onModuleInit() {}
}
