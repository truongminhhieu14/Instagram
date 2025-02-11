import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column({ nullable: false })
  content: string;

  @ManyToOne(() => User, (user) => user.comment)
  user: User;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => Comment, (comment) => comment.parent_comment, { onDelete: 'CASCADE', nullable: true })
  parent_comment: Comment;

  @CreateDateColumn()
  created_at: Date;
}
