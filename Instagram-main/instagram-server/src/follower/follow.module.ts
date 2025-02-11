import { Module, forwardRef } from '@nestjs/common';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { UserModule } from 'src/user/user.module';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LikePostService } from 'src/like-post/like-post.service';
import { LikePost } from 'src/like-post/like-post.entity';
import { LikePostModule } from 'src/like-post/like-post.module';
import { Post } from 'src/post/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Follow, User, LikePost, Post]), forwardRef(() => UserModule), LikePostModule],
  controllers: [FollowController],
  providers: [FollowService, UserService, LikePostService]
})
export class FollowModule {}
