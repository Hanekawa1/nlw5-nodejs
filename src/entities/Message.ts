import { Entity, Column, CreateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { v4 as uuid } from "uuid";
import { User } from './User';

@Entity("messages")
class Message {

  @PrimaryColumn()
  id: string;

  @Column()
  admin_id: string;

  @Column()
  text: string;

  @CreateDateColumn()
  created_at: string

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User)
  user: User;

  @Column()
  user_id: string;

  constructor() {
    if(!this.id) {
      this.id = uuid();
    }
  }
}

export { Message }