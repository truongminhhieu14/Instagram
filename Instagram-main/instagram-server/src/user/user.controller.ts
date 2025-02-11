import {
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Request,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { PostService } from 'src/post/post.service';
import { FollowService } from 'src/follower/follow.service';

@Controller()
export class UserController {
  constructor(private userService: UserService, private postService: PostService, private followService: FollowService) {}

  // load profile
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get('/:user_id')
  async getProfile(@Request() req, @Param('user_id') user_id: string) {
    const numberOfFollowers = await this.followService.getNumberOfFollowers(user_id)
    const numberOfFollowings = await this.followService.getNumberOfFollowings(user_id)
    const userProfile = await this.userService.getProfile(user_id);
    const numberOfPost = await this.postService.getNumberOfPost(user_id)
    return { userProfile, numberOfFollowers, numberOfFollowings, numberOfPost, message: 'Get Profile Successfully' };
  }

  @Delete('/profile')
  async getUser() {
    return await this.userService.deleteUser('long1', 'long1@gmail.com');
  }
}
