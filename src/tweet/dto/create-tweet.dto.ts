// create-tweet.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTweetDto {
  @ApiProperty({
    description: 'The content of the tweet',
    example: 'This is an example tweet content.',
    maxLength: 280,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(280)
  content: string;

  @ApiProperty({
    description: 'The ID of the user creating the tweet',
    example: '9876543210',
  })
  @IsNotEmpty()
  userId: string;
}
