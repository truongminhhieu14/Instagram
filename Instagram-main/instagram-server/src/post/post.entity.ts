import { Comment } from 'src/comment/comment.entity';
import { LikePost } from 'src/like-post/like-post.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column()
  text: string;

  @Column("text", { array: true, default: [] })
  photo: string[];

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => LikePost, (likePost) => likePost.post, { onDelete: 'CASCADE' })
  likeOfPost: LikePost[];

  @OneToMany(() => Comment, comment => comment.post, {onDelete: 'CASCADE'})
  comment: Comment

  @CreateDateColumn()
  created_at: Date;
}
