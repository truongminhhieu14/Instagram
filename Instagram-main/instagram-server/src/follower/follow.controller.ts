import { Body, Controller, Delete, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { Follow } from './follow.entity';
import { FollowService } from './follow.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';

@Controller('follow')
export class FollowController {
  constructor(private followService: FollowService) {}

  @Post('/:userId')
  @UseGuards(JwtAuthGuard)
  async followUser(@Param('userId') userId: string, @Request() req): Promise<Follow> {
    return this.followService.followUser(req.user.user_id, userId);
  }

  // @Get('/follower/:userId')
  // @UseGuards(JwtAuthGuard)
  // async getFollowers(@Param('userId') userId: string): Promise<Follow[]> {
  //   return this.followService.getFollowers(userId);
  // }

  @Get('/following/:userId')
  @UseGuards(JwtAuthGuard)
  async getFollowing(@Param('userId') userId: string): Promise<Follow[]> {
    return this.followService.getFollowing(userId);
  }

  @Delete('/:userId')
  @UseGuards(JwtAuthGuard)
  async unfollowUser(@Param('userId') userId: string, @Request() req): Promise<string> {
    return this.followService.unfollowUser(req.user.user_id, userId);
  }

  @Get('/getFollow/:userId')
  @UseGuards(JwtAuthGuard)
  async getFollow(@Param('userId') userId: string, @Request() req): Promise<Follow> {
    return await this.followService.getFollow(req.user.user_id, userId);
  }

  @Get('/getFollowersInViewProfile/:userId')
  @UseGuards(JwtAuthGuard)
  async getFollersInViewProfile(@Param('userId') userId: string, @Body() body: {page: string}): Promise<Follow[]> {
    return await this.followService.getFollowersInViewProfile(userId, body.page);
  }
}
