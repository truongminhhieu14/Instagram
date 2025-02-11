import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { LikePostService } from 'src/like-post/like-post.service';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @InjectRepository(User) private userRepository: Repository<User>,
    private likePostService: LikePostService
  ) {}

  async followUser(user_id: string, follower: string): Promise<Follow> {
    const mySelf = await this.userRepository.findOne({ where: { user_id } });
    if (!mySelf) throw new BadRequestException('User not found');
    const user = await this.userRepository.findOne({ where: { user_id: follower } });
    if (!user) throw new BadRequestException('User not found');
    const newFollow = new Follow();
    newFollow.user = mySelf;
    newFollow.follower = user;
    return await this.followRepository.save(newFollow);
  }

  async getFollowersForFeed(user_id: string): Promise<Follow[]> {
    return await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.follower', 'follower')
      .leftJoinAndSelect('follow.user', 'user')
      .where('follower.user_id = :user_id', { user_id })
      .getMany();
  }

  async getFollowersInViewProfile(user_id: string, page: string) {
    return await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.follower', 'follower')
      .leftJoinAndSelect('follow.user', 'user')
      .where('follower.user_id = :user_id', { user_id })
      .orderBy('user.username', 'ASC')
      .skip(Number(page) * 4)
      .take(4)
      .getMany();
  }

  async getFollowing(user_id: string): Promise<Follow[]> {
    return await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.user', 'user')
      .leftJoinAndSelect('follow.follower', 'follower')
      .where('user.user_id = :user_id', { user_id })
      .getMany();
  }

  async getFollowingsInViewProfile(user_id: string, page: string){
    return await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.user', 'user')
      .leftJoinAndSelect('follow.follower', 'follower')
      .where('user.user_id = :user_id', { user_id })
      .orderBy('follower.username', 'ASC')
      .skip(Number(page) * 4)
      .take(4)
      .getMany();
  }

  async unfollowUser(user_id: string, follower_id: string): Promise<string> {
    try {
      const unfollow = await this.followRepository
        .createQueryBuilder()
        .leftJoinAndSelect('follow.user', 'user')
        .leftJoinAndSelect('follow.follower', 'follower')
        .delete()
        .where('user.user_id = :user_id AND follower.user_id = :follower_id', { user_id, follower_id })
        .execute();
      if (unfollow.affected === 0) {
        throw new Error('User not found');
      }
      return 'User unfollowed successfully';
    } catch (error) {
      throw new Error(error);
    }
  }

  async getFollow(user_id: string, follower_id: string): Promise<Follow> {
    return await this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.user_id', 'user')
      .leftJoinAndSelect('follow.follower', 'follower')
      .where('user.user_id = :user_id AND follower.user_id = :follower_id', { user_id, follower_id })
      .getOne();
  }

  async getNumberOfFollowers(user_id: string): Promise<number> {
    return this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.follower', 'user')
      .where('user.user_id = :user_id', { user_id })
      .getCount();
  }

  async getNumberOfFollowings(user_id: string): Promise<number> {
    return this.followRepository
      .createQueryBuilder('follow')
      .leftJoinAndSelect('follow.user', 'user')
      .where('user.user_id = :user_id', { user_id })
      .getCount();
  }
}
