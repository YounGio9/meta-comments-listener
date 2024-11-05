import { Module } from '@nestjs/common';
import { InstagramController } from './instagram.controller';
import { InstagramService } from './instagram.service';
import { TokenService } from 'src/services/token.service';

@Module({
  controllers: [InstagramController],
  providers: [InstagramService, TokenService],
})
export class InstagramModule {}
