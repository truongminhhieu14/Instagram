import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentService } from 'src/comment/comment.service';
import { FollowService } from 'src/follower/follow.service';
import { LikePostService } from 'src/like-post/like-post.service';
import { Post } from 'src/post/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FeedService {
  constructor(
    private followService: FollowService,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    private likePostService: LikePostService,
    private commentService: CommentService
  ) {}

  async getArrayOfFollowing(userID: string): Promise<string[]> {
    const followers = await this.followService.getFollowing(userID);
    return followers.map((follower) => follower.follower.user_id);
  }

  async loadFeed(page: string, user_id: string) {
    const following = await this.getArrayOfFollowing(user_id);
    const feed = await this.getFeed(Number(page), following, user_id);
    return feed;
  }

  async convertEntityToResponse(feed: Post[], user_id: string) {
    return await Promise.all(
      feed.map(async (post) => {
        const numberLikeOfPost = await this.likePostService.getCountLikesOfPost(post.post_id);
        const numberCommentOfPost = await this.commentService.getCountAllCommentOfPost(post.post_id);
        const isLiked = await this.likePostService.checkIsLiked(post.post_id, user_id);
        post['numberLikeOfPost'] = numberLikeOfPost;
        post['isLiked'] = Boolean(isLiked);
        post['numberCommentOfPost'] = numberCommentOfPost;
        return post;
      })
    );
  }

  async getFeed(page: number, arrayOfUserId: string[], user_id: string) {
    const data = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'user')
      .addSelect(['user.username', 'user.avatar', 'user.user_id'])
      .where('user.user_id IN (:...arrayOfUserId)', { arrayOfUserId: arrayOfUserId })
      .orderBy('post.created_at', 'ASC')
      .skip(page * 4)
      .take(4)
      .getMany();
    const response = await this.convertEntityToResponse(data, user_id)
    return response;
  }
}
