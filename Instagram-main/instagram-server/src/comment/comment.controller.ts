import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Req() req, @Body() createCommentDto: { content: string; postId: string }) {
    return this.commentService.createComment(createCommentDto.content, createCommentDto.postId, req.user.user_id);
  }

  @Post('child')
  @UseGuards(JwtAuthGuard)
  async createChildComment(
    @Req() req,
    @Body() createChildCommentDto: { content: string; postId: string; parentCommentId: string }
  ) {
    return this.commentService.createChildComment(
      createChildCommentDto.content,
      createChildCommentDto.postId,
      req.user.user_id,
      createChildCommentDto.parentCommentId
    );
  }

  @Delete(':commentId')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Req() req, @Param('commentId') commentId: string) {
    return this.commentService.deleteComment(commentId, req.user.user_id);
  }

  @Get(':postId')
  @UseGuards(JwtAuthGuard)
  async getAllParentCommentOfPost(@Param('postId') postId: string){
    return await this.commentService.getAllParrentCommentOfPost(postId)
  }

  @Get('child/:parentId')
  @UseGuards(JwtAuthGuard)
  async getAllChildCommentOfParrentComment(@Param('parentId') parentId: string){
    return await this.commentService.getAllChildCommentOfParentComment(parentId)
  }
}
