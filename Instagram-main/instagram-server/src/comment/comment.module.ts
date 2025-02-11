import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { User } from 'src/user/user.entity';
import { Post } from 'src/post/post.entity';
import { CommentController } from './comment.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  providers: [CommentService],
  controllers: [CommentController]
})
export class CommentModule {}
