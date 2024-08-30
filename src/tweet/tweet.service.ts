// tweet/tweet.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { ReTweetDto } from './dto/retweet.dto';
import { User } from 'src/user/entity/user.entity';
import { Tweet } from './entities/tweet.entity';
import { TweetLike } from './entities/tweet-like.entity';
import { CreateTweetLikeDto } from './dto/tweet-like.dto';

@Injectable()
export class TweetService {
  constructor(
    @InjectRepository(Tweet)
    private readonly tweetRepository: Repository<Tweet>,
    @InjectRepository(TweetLike)
    private readonly tweetLikeRepository: Repository<TweetLike>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(createTweetDto: CreateTweetDto): Promise<Tweet> {
    const user = await this.userRepository.findOne({ where: { uid: createTweetDto.userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const tweet = this.tweetRepository.create({ ...createTweetDto, user });
    return this.tweetRepository.save(tweet);
  }

  async findAll(): Promise<Tweet[]> {
    return this.tweetRepository.find();
  }

  async findOne(id: number): Promise<Tweet> {
    const tweet = await this.tweetRepository.findOne({ where: { id } });
    if (!tweet) {
      throw new NotFoundException(`Tweet with ID ${id} not found`);
    }
    return tweet;
  }

  async retweet(tweetId: number, retweetDto: ReTweetDto): Promise<Tweet> {
    const originalTweet = await this.findOne(tweetId);  // Reuses findOne to handle not found exception
    const retweet = this.tweetRepository.create({ ...retweetDto, originalTweet });
    return this.tweetRepository.save(retweet);
  }

  async like(tweetId: number, createTweetLikeDto: CreateTweetLikeDto): Promise<TweetLike> {
    const tweet = await this.findOne(tweetId);  // Ensure the tweet exists
    const user = await this.userRepository.findOne({ where: { uid: createTweetLikeDto.userId } });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const like = this.tweetLikeRepository.create({ tweet, user });
    return this.tweetLikeRepository.save(like);
  }

  async remove(id: number): Promise<void> {
    const tweet = await this.findOne(id); 
    await this.tweetRepository.remove(tweet);
  }
}
