// src/user/services/timeline.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Injectable()
export class TimelineService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Tweet)
        private readonly tweetRepository: Repository<Tweet>,
    ) {}

    async getTimeline(userId: string, page: number = 1, limit: number = 10): Promise<Tweet[]> {
        const user = await this.userRepository.findOne({ where: { uid: userId }, relations: ['following'] });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        const followingIds = user.following.map(following => following.uid);

        return this.tweetRepository.find({
            where: {
                user: { uid: In(followingIds) },
            },
            order: {
                createdAt: 'DESC',
            },
            take: limit,
            skip: (page - 1) * limit,
        });
    }
}
