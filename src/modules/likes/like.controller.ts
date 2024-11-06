import { Controller, OnModuleInit, Param, Post } from '@nestjs/common';
import { InstagramService } from '../instagram/instagram.service';
import { FacebookService } from '../facebook/facebook.service';
import { logger } from 'src/config/logger.config';

@Controller('likes')
export class LikeController implements OnModuleInit {
  constructor(
    private readonly instagramService: InstagramService,
    private readonly facebookService: FacebookService,
  ) {}

  @Post('facebook/:id')
  handleCommentOnPost(@Param('id') postId: string) {
    return this.facebookService.likePost(postId);
  }

  async onModuleInit() {
    // logger.info(
    //   await this.facebookService.likePost(
    //     '122099038364606961_1069702388221859',
    //   ),
    // );
  }
}
