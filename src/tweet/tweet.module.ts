import { Module } from '@nestjs/common';
import { TweetService } from './tweet.service';
import { TweetController } from './tweet.controller';
import { Tweet } from './entities/tweet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetLike } from './entities/tweet-like.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tweet, User, TweetLike]), 
  ],
  controllers: [TweetController],
  providers: [TweetService],
})
export class TweetModule {}
