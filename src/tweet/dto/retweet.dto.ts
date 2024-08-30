// retweet.dto.ts

import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateTweetDto } from './create-tweet.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReTweetDto extends PartialType(CreateTweetDto) {
  @ApiProperty({
    description: 'The ID of the original tweet being retweeted',
    example: '1234567890',
  })
  @IsNotEmpty()
  @IsNumber()
  originalTweetId: string;
}
