// tweet/tweet.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ReTweetDto } from './dto/retweet.dto';
import { CreateTweetLikeDto } from './dto/tweet-like.dto';
import { Auth } from 'src/decorators/auth.decorator';

@ApiTags('tweets')
@Controller('tweets')
export class TweetController {
  constructor(private readonly tweetService: TweetService) {}

  @ApiOperation({ summary: 'Create new tweet' })
  @ApiResponse({ status: 201, description: 'Tweet successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('access-token')
  @Auth('USER')
  @Post()
  create(@Request() req, @Body() createTweetDto: CreateTweetDto) {
    return this.tweetService.create(createTweetDto, req.user.uid);
  }

  @ApiOperation({ summary: 'Get all tweets' })
  @Get()
  findAll() {
    return this.tweetService.findAll();
  }

  @ApiOperation({ summary: 'Get tweet by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tweetService.findOne(+id);
  }

  @ApiOperation({ summary: 'Retweet a tweet' })
  @Post(':id/retweet')
  @ApiBearerAuth('access-token')
  @Auth('USER')
  retweet(@Param('id') tweetId: string, @Body() retweetDto: ReTweetDto) {
    return this.tweetService.retweet(+tweetId, retweetDto);
  }

  @ApiOperation({ summary: 'Like a tweet' })
  @Post(':id/like')
  @ApiBearerAuth('access-token')
  @Auth('USER')
  like(@Param('id') tweetId: string, @Body() createTweetLikeDto: CreateTweetLikeDto) {
    return this.tweetService.like(+tweetId, createTweetLikeDto);
  }

  @ApiOperation({ summary: 'Delete a tweet' })
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @Auth('USER')
  remove(@Param('id') id: string) {
    return this.tweetService.remove(+id);
  }
}
