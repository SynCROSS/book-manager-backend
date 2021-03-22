import { IsString, IsOptional } from 'class-validator';
export class UserDTO {
  @IsString() user_name!: string;
  @IsString() nickname!: string;
  @IsOptional() @IsString() password?: string;
}
