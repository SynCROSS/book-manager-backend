import { IsNumber, IsOptional, IsString } from 'class-validator';
export class BookDTO {
  @IsNumber() readonly book_id!: number;
  @IsString() readonly title!: string;
  @IsString() readonly author_lf!: string;
  @IsString() readonly author_fl!: string;
  @IsOptional() @IsNumber() readonly ISBN?: number = 0;
  @IsOptional() @IsNumber() readonly rating?: number = 0;
  @IsOptional() @IsString() readonly language_main?: string;
  @IsOptional() @IsString() readonly language_secondary?: string;
  @IsOptional() @IsString() readonly language_original?: string;
  @IsString() readonly cover!: string;
  @IsNumber() readonly entry_stamp!: number;
}
