import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebaseAdmin } from 'config/firebase.setup';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), 
  ],
  controllers: [UserController],
  providers: [UserService, FirebaseAdmin]
})
export class UserModule {}
