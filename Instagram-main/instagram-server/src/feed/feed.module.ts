import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/post/post.entity';
import { FollowService } from 'src/follower/follow.service';
import { FollowModule } from 'src/follower/follow.module';
import { Follow } from 'src/follower/follow.entity';
import { User } from 'src/user/user.entity';
import { PostService } from 'src/post/post.service';
import { LikePostService } from 'src/like-post/like-post.service';
import { CommentService } from 'src/comment/comment.service';
import { LikePost } from 'src/like-post/like-post.entity';
import { Comment } from 'src/comment/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Follow, User, LikePost, Comment])],
  providers: [FeedService, FollowService, CommentService, LikePostService],
  controllers: [FeedController]
})
export class FeedModule {}
