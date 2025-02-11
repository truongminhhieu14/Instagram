import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { Follow } from 'src/follower/follow.entity';
import { FollowModule } from 'src/follower/follow.module';
import { Post } from 'src/post/post.entity';
import { LikePost } from 'src/like-post/like-post.entity';
import { Comment } from 'src/comment/comment.entity';
import { Message } from 'src/events/message/message.entity';
import Room from 'src/events/room/room.entity';
import { PostModule } from 'src/post/post.module';
import { PostService } from 'src/post/post.service';
import { FollowService } from 'src/follower/follow.service';
import { LikePostModule } from 'src/like-post/like-post.module';
import { LikePostService } from 'src/like-post/like-post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Follow, Post, LikePost, Comment, Message, Room]),
    PassportModule,
    forwardRef(() => FollowModule),
    forwardRef(() => LikePostModule),
    forwardRef(() => PostModule),
    
  ],
  providers: [UserService, PostService, JwtStrategy, FollowService, LikePostService],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
