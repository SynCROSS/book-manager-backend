import { Book } from './book.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('increment')
  user_id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  user_name: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  nickname: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  password: string;

  @OneToMany(type => Book, book => book.borrower)
  borrowedBooks: Book[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
