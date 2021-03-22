export class BookDTO {
  book_id!: number;
  title!: string;
  author_lf!: string;
  author_fl!: string;
  ISBN!: number;
  rating?: number;
  language_main?: string;
  language_secondary?: string;
  language_original?: string;
  cover!: string;
  entry_stamp!: number;
}
