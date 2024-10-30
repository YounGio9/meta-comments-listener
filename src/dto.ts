import { IsNotEmpty, IsString } from 'class-validator';

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
