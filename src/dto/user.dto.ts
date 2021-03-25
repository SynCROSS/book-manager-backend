import { IsString, IsOptional } from 'class-validator';
export class UserDTO {
  @IsString() username!: string;
  @IsString() nickname!: string;
  @IsOptional() @IsString() password?: string;
}
