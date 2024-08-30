//tweet-like.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTweetLikeDto {
  @ApiProperty({
    description: 'The ID of the user liking the tweet',
    example: 'user_123456',
  })
  @IsNotEmpty()
  userId: string;
}