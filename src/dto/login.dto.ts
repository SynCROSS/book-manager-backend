import { IsOptional, IsString } from 'class-validator';

export class LoginDTO {
  @IsString() username!: string;
  @IsOptional() @IsString() password?: string;
}
