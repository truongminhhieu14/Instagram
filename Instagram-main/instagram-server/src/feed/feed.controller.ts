import { Body, Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private feedService: FeedService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getFeed(@Request() req, @Body() body: { page: string }) {
    return this.feedService.loadFeed(body.page, req.user.user_id);
  }
}
