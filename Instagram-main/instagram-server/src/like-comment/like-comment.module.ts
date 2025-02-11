import { Module } from '@nestjs/common';
import { LikeCommentService } from './like-comment.service';

@Module({
  providers: [LikeCommentService]
})
export class LikeCommentModule {}
