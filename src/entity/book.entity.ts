import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('increment')
  book_id!: number;

  @Column({
    type: 'text',
    // length: 42000,
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
    type: 'int',
  })
  ISBN!: number;

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
    type: 'varchar',
    length: 100,
  })
  cover!: string;

  @Column({
    type: 'timestamp',
  })
  entry_stamp!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
