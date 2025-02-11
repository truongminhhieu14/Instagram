import { CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Message } from '../message/message.entity';
import { User } from 'src/user/user.entity';

@Entity()
export default class Room {
  @PrimaryGeneratedColumn('uuid')
  room_id: string;

  @OneToMany(() => Message, (message) => message.room, { onDelete: 'CASCADE', nullable: true })
  message: Message;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user_1: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user_2: User;

  @CreateDateColumn()
  updated_at: Date;
}
