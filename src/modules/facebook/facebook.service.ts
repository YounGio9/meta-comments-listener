import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config/configuration';
import { firstValueFrom } from 'rxjs';
import { FBCommentDto, ReplyDto } from './facebook.dto';

@Injectable()
export class FacebookService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AppConfig>,
  ) {}

  async replyToComment(payload: ReplyDto) {
    const successfullReply = await this.queryFacebook(
      'POST',
      {
        message: payload.text,
      },
      `${payload.commentId}`,
    );

    return successfullReply.data;
  }

  async commentOnPost(payload: FBCommentDto) {
    const successfullReply = await this.queryFacebook(
      'POST',
      {},
      `${payload.postId}/comments`,
      {
        message: payload.text,
      },
    );

    return successfullReply.data;
  }

  async likePost(postId: string) {
    const successfullLike = await this.queryFacebook(
      'POST',
      {},
      `${postId}/likes`,
    );

    return successfullLike.data;
  }

  private queryFacebook(
    method: 'POST' | 'GET',
    params: Record<string, string>,
    path: string,
    data?: any,
  ) {
    console.log(
      this.configService.get('facebook.accessToken', {
        infer: true,
      }),
    );

    return firstValueFrom(
      this.httpService.request({
        method,
        url: `https://graph.facebook.com/v21.0/${path}`,
        data,
        params: {
          ...params,
          access_token: this.configService.get('facebook.accessToken', {
            infer: true,
          }),
        },
      }),
    );
  }

  // async resolveParentComment(comment: CommentValue) {
  //   if (comment.parent_id) {
  //     comment.parent = await this.getComment(comment.parent_id);

  //     this.resolveParentComment(comment.parent);
  //   }

  //   return comment;
  // }
}
