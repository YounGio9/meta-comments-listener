import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from '../../config/configuration';
import { firstValueFrom } from 'rxjs';
import { CommentValue } from '../../interfaces/comment.interface';
import { ReplyDto } from './instagram.dto';

@Injectable()
export class InstagramService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService<AppConfig>,
  ) {}
  async getComment(commentId: string): Promise<CommentValue> {
    const retrievedComment = await this.queryInstagram(
      'GET',
      {
        fields: `
          hidden,
          media,
          text,
          timestamp,
          from,
          parent_id
        `,
      },
      commentId,
    );

    return retrievedComment.data;
  }

  async getMedia(mediaId: string) {
    const retrievedMedia = await this.queryInstagram(
      'GET',
      {
        fields: `
          id,
          media_type,
          media_url,
          timestamp,
          like_count,
          comments_count
        `,
      },
      mediaId,
    );

    return retrievedMedia.data;
  }

  async reply(payload: ReplyDto) {
    const successfullReply = await this.queryInstagram(
      'POST',
      {
        message: payload.text,
      },
      `${payload.commentId}/replies`,
    );

    return successfullReply.data;
  }

  private queryInstagram(
    method: 'POST' | 'GET',
    params: Record<string, string>,
    path: string,
  ) {
    console.log(
      this.configService.get('instagram.accessToken', {
        infer: true,
      }),
    );

    return firstValueFrom(
      this.httpService.request({
        method,
        url: `https://graph.instagram.com/v21.0/${path}`,
        params: {
          ...params,
          access_token: this.configService.get('instagram.accessToken', {
            infer: true,
          }),
        },
      }),
    );
  }

  async resolveParentComment(comment: CommentValue) {
    if (comment.parent_id) {
      comment.parent = await this.getComment(comment.parent_id);

      this.resolveParentComment(comment.parent);
    }

    return comment;
  }
}
