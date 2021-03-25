import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { getRepository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userData) {
    const { username, password } = userData;

    console.log(userData);

    const user = await getRepository(User).findOne({
      where: {
        username,
      },
    });

    if (user?.user_name && compareSync(password, user.password)) {
      return true;
    }
    return false;
  }

  async loginUser(userData: { username: string; password: string }) {
    const user = await getRepository(User).findOneOrFail({
      user_name: userData.username,
    });

    if (compareSync(userData.password, user.password)) {
      return {
        access_token: this.jwtService.sign({
          id: user.id,
          user_name: user.user_name,
        }),
      };
    }
    return null;
  }

  // * loginCheck
}
