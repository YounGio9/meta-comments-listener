import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { InstagramModule } from './modules/instagram/instagram.module';
import { CommentModule } from './modules/comments/comment.module';
import { FacebookModule } from './modules/facebook/facebook.module';

@Module({
  imports: [
    HttpModule.register({ global: true }),
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    InstagramModule,
    FacebookModule,
    CommentModule,
  ],
})
export class AppModule {}
