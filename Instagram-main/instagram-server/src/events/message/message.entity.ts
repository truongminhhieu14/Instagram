import { User } from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Room from "../room/room.entity";

@Entity()
export class Message{
    @PrimaryGeneratedColumn('uuid')
    message_id: string;

    @ManyToOne(() => User, {onDelete: 'CASCADE'})
    sender_id: User

    @Column()
    content: string

    @CreateDateColumn()
    created_at: Date

    @ManyToOne(() => Room, room => room.message, {onDelete: 'CASCADE'})
    room: Room;
}