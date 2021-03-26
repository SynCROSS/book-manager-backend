import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { getRepository } from 'typeorm';
import { LoginDTO } from '../dto/login.dto';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(loginDTO: LoginDTO) {
    const { username, password } = loginDTO;

    const user = await getRepository(User).findOneOrFail({
      username,
    });

    if (user?.username && compareSync(password, user.password)) {
      return true;
    }
    return false;
  }

  async loginUser(loginDTO: LoginDTO) {
    const user = await this.usersService.getUserByUsername(loginDTO.username);
    if (!user) return null;

    const token = this.jwtService.sign(loginDTO);

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  getUser(req: Request) {
    req.body.password = undefined;
    return req.body;
  }

  async login(req: Request, res: Response) {
    const cookie = await this.loginUser(req.body);

    res.setHeader('Set-Cookie', cookie);
    return res.send(req.body);
  }

  logout(res: Response) {
    res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    return res.sendStatus(200);
  }
}
