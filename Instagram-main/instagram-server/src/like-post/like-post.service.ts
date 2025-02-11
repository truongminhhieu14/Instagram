import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LikePost } from './like-post.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class LikePostService {
  constructor(
    @InjectRepository(LikePost) private likePostRepository: Repository<LikePost>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async likePost(postId: string, userId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id = :userId', { userId })
      .getOne();
    if (!user) throw new BadRequestException('User not found');
    const likePost = new LikePost();
    likePost.post = post;
    likePost.user = user;
    await this.likePostRepository.save(likePost);
    return likePost;
  }

  async dislikePost(postId: string, userId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id = :userId', { userId })
      .getOne();
    if (!user) throw new BadRequestException('User not found');

    const likepost = await this.likePostRepository
      .createQueryBuilder('likepost')
      .innerJoin('likepost.post', 'post')
      .innerJoin('likepost.user', 'user')
      .delete()
      .from(LikePost)
      .where('post.post_id = :postId', { postId })
      .andWhere('user.user_id = :userId', { userId })
      .execute();
    if (likepost.affected === 0) throw new BadRequestException('Something wrong happened. Please try again.');
    return { message: 'Dislike post successfully' };
  }

  async seeAllLikesOfPost(postId: string, page: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const users = await this.likePostRepository
      .createQueryBuilder('likepost')
      .leftJoin('likepost.user', 'user')
      .addSelect(['user.username', 'user.avatar', 'user.user_id'])
      .where('likepost.post.post_id = :postId', { postId })
      .skip(Number(page) * 4)
      .take(4)
      .getMany();
    return users;
  }

  async getCountLikesOfPost(postId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const count = await this.likePostRepository
      .createQueryBuilder('likepost')
      .leftJoin('likepost.post', 'post')
      .where('post.post_id = :postId', { postId })
      .getCount();
    return count;
  }

  async checkIsLiked(postId: string, userId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.user_id = :userId', { userId })
      .getOne();
    if (!user) throw new BadRequestException('User not found');
    const isExist = await this.likePostRepository
      .createQueryBuilder('likepost')
      .leftJoin('likepost.post', 'post')
      .leftJoin('likepost.user', 'user')
      .where('post.post_id = :postId', { postId })
      .andWhere('user.user_id = :userId', { userId })
      .getOne();
    if(isExist) return true;
    return false
  }
}
