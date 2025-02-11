import { User } from 'src/user/user.entity';
import { CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.followers, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => User, (user) => user.following, { onDelete: 'CASCADE' })
  follower: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
