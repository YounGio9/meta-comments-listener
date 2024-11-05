import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class GetWebHookQueryDto {
  @IsString()
  @IsNotEmpty()
  'hub.challenge': string;

  @IsString()
  @IsNotEmpty()
  'hub.verify_token': string;

  @IsString()
  @IsNotEmpty()
  'hub.mode': string;
}

export class FBCommentDto {
  @IsString()
  @MinLength(2)
  text: string;

  @IsString()
  postId: string;
}

export class ReplyDto {
  @IsString()
  @MinLength(2)
  text: string;

  @IsString()
  commentId: string;
}
