import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { LikePostService } from './like-post.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('like-post')
export class LikePostController {
  constructor(private likePostService: LikePostService) {}

  @Post(':postId')
  @UseGuards(JwtAuthGuard)
  async likePost(@Req() req, @Param('postId') postId: string) {
    return await this.likePostService.likePost(postId, req.user.user_id);
  }

  @Post('dislike/:postId')
  @UseGuards(JwtAuthGuard)
  async dislikePost(@Req() req, @Param('postId') postId: string) {
    return await this.likePostService.dislikePost(postId, req.user.user_id);
  }

  @Get('see-all-likes/:postId')
  async seeAllLikesOfPost(@Param('postId') postId: string, @Body('page') body: {page: string}){
    return await this.likePostService.seeAllLikesOfPost(postId, body.page);
  }
}
