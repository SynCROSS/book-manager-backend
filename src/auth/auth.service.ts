import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { getRepository } from 'typeorm';
import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await getRepository(User).findOneOrFail({
      username: username,
    });

    if (user?.username && compareSync(password, user.password)) {
      return true;
    }
    return false;
  }

  async loginUser(loginDTO: LoginDTO) {
    return {
      access_token: this.jwtService.sign({
        username: loginDTO?.username,
        password: loginDTO?.password,
      }),
    };
  }

  // * loginCheck
}
