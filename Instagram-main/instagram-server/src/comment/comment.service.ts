import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {}

  async createComment(content: string, postId: string, userId: string) {
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
    const comment = new Comment();
    comment.content = content;
    comment.post = post;
    comment.user = user;
    return await this.commentRepository.save(comment);
  }

  async createChildComment(content: string, postId: string, userId: string, parentCommentId: string) {
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
    const parentComment = await this.commentRepository
      .createQueryBuilder('comment')
      .where('comment.comment_id = :parentCommentId', { parentCommentId })
      .getOne();
    if (!parentComment) throw new BadRequestException('Parent comment not found');
    const comment = this.commentRepository.create({ content, post, user, parent_comment: parentComment });
    return await this.commentRepository.save(comment);
  }

  async deleteComment(commentId: string, userId: string) {
    const comment = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.comment_id = :commentId', { commentId })
      .getOne();
    if (!comment) throw new BadRequestException('Comment not found');
    if (comment.user.user_id !== userId) throw new BadRequestException('You are not authorized');

    const deleteComment = await this.commentRepository
      .createQueryBuilder('comment')
      .delete()
      .from(Comment)
      .where('comment.comment_id = :commentId', { commentId })
      .execute();
    if (deleteComment.affected === 0) throw new BadRequestException('Something wrong happened. Please try again.');
    return { message: 'Delete comment successfully' };
  }

  async getAllParrentCommentOfPost(postId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const comments = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where('comment.post.post_id = :postId', { postId })
      .andWhere('comment.parent_comment IS NULL')
      .getMany();
    return comments;
  }

  async getAllChildCommentOfParentComment(parentCommentId: string) {
    const child = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.parent_comment', 'child')
      .where('child.comment_id = :parentCommentId', { parentCommentId })
      .getMany();
    return child;
  }

  async getCountAllCommentOfPost(postId: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .where('post.post_id = :postId', { postId })
      .getOne();
    if (!post) throw new BadRequestException('Post not found');
    const count = await this.commentRepository
      .createQueryBuilder('comment')
      .leftJoin('comment.post', 'post')
      .where('post.post_id = :postId', { postId })
      .getCount();
    return count;
  }
}
