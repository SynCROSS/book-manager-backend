import { IsString } from 'class-validator';

export class BorrowDTO {
  @IsString() username: string;
}
