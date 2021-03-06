import { User } from './user.entity';
import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn()
  book_id!: number;

  @Column({
    type: 'text',
  })
  title!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  author_lf!: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  author_fl!: string;

  @Column({
    type: 'bigint',
  })
  ISBN?: number;

  @Column({
    type: 'float',
    nullable: true,
  })
  rating?: number;

  @Column({
    type: 'varchar',
    length: 3,
    nullable: true,
  })
  language_main?: string;

  @Column({
    type: 'varchar',
    length: 3,
    nullable: true,
  })
  language_secondary?: string;

  @Column({
    type: 'varchar',
    length: 3,
    nullable: true,
  })
  language_original?: string;

  @Column({
    type: 'text',
  })
  cover!: string;

  @Column({
    type: 'bigint',
  })
  entry_stamp?: number;

  @ManyToOne(() => User, user => user.borrowedBooks)
  borrower: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
