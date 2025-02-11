import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LikePost {
  @PrimaryGeneratedColumn('uuid')
  like_post_id: string;

  @ManyToOne(() => Post, (post) => post.likeOfPost, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, user => user.likePostOfUser, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn({})
  create_at: Date;
}
