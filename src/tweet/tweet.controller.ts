// tweet/tweet.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiUnauthorizedResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
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
  @ApiResponse({ status: 201, description: 'Tweet Retweeted Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  retweet(@Param('id') tweetId: string, @Request() req) {
    return this.tweetService.retweet(+tweetId, req.user.uid);
  }

  @ApiOperation({ summary: 'Like a tweet' })
  @Post(':id/like')
  @ApiBearerAuth('access-token')
  @Auth('USER')
  @ApiResponse({ status: 201, description: 'Tweet Liked Successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  like(@Param('id') tweetId: string,  @Request() req) {
    return this.tweetService.like(+tweetId, req.user.uid);
  }

  @ApiOperation({ summary: 'Delete a tweet' })
  @Delete(':id')
  @ApiBearerAuth('access-token')
  @Auth('USER')
  @ApiResponse({ status: 200, description: 'Tweet successfully deleted.' })
  @ApiUnauthorizedResponse({ description: 'You do not have permission to delete this tweet.' })
  @ApiNotFoundResponse({ description: 'Tweet not found.' })
  async remove(@Param('id') id: string,  @Request() req) {
    await this.tweetService.remove(+id, req.user.uid);
    return { message: 'Tweet deleted successfully' };
  }
}
