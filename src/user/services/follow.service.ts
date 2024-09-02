// src/user/services/follow.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class FollowService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async followUser(userId: string, followUserId: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { uid: userId }, relations: ['following'] });
        const followUser = await this.userRepository.findOne({ where: { uid: followUserId } });

        if (!user || !followUser) {
            throw new NotFoundException('User not found');
        }

        user.following.push(followUser);
        await this.userRepository.save(user);
    }

    async unfollowUser(userId: string, unfollowUserId: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { uid: userId }, relations: ['following'] });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        user.following = user.following.filter(following => following.uid !== unfollowUserId);
        await this.userRepository.save(user);
    }
}
