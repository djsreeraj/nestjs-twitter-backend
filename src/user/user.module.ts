import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseAdmin } from 'config/firebase.setup';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TimelineService } from './services/timeline.service';
import { FollowService } from './services/follow.service';
import { Tweet } from 'src/tweet/entities/tweet.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Tweet]), 
  ],
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin, TimelineService, FollowService], 
})
export class UserModule {}
