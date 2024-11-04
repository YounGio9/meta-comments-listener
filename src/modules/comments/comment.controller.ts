import { Body, Controller, OnModuleInit, Post } from '@nestjs/common';
import { InstagramService } from '../instagram/instagram.service';
import { ReplyDto } from '../instagram/instagram.dto';

@Controller('comments')
export class CommentController implements OnModuleInit {
  constructor(private readonly instagramService: InstagramService) {}

  @Post('/instagram/reply')
  handleReplyToComment(@Body() payload: ReplyDto) {
    return this.instagramService.reply(payload);
  }

  async onModuleInit() {}
}
