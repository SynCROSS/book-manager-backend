import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { AuthService } from './auth.service';
// import { UsersService } from '../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(userData): Promise<any> {
    const user = await this.authService.validateUser(userData);

    console.log(user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
