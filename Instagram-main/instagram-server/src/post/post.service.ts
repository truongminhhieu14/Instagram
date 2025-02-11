import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createPost(text: string, photos: string[], author: string) {
    const user = await this.userRepository.findOne({ where: { user_id: author } });
    const post = this.postRepository.create({ text, photo: photos, author: user });
    return await this.postRepository.save(post);
  }

  async getAllPostOfUser(user_id: string, page: string) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.author', 'author')
      .leftJoin('post.likeOfPost', 'likes')
      .leftJoin('post.comment', 'comments')
      .where('author.user_id = :user_id', { user_id })
      .select(['post.post_id', 'post.photo'])
      .addSelect('COUNT(DISTINCT(likes.like_post_id)) as number_of_likes')
      .addSelect('COUNT(DISTINCT(comments.comment_id)) as number_of_comments')
      .groupBy('post.post_id')
      .offset(Number(page) * 6)
      .limit(6)
      .getRawMany();
  }

  async getPostByPostId(post_id: string) {
    return await this.postRepository.createQueryBuilder('post').where('post.post_id = :post_id', { post_id }).getOne();
  }

  async getNumberOfPost(user_id: string) {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .where('author.user_id = :user_id', { user_id })
      .getCount();
  }
}
