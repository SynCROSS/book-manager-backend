import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from 'src/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { getRepository } from 'typeorm';
import { LoginDTO } from '../dto/login.dto';
import { Request, response, Response } from 'express';
import { verify } from 'jsonwebtoken';

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
    const user = await this.usersService.getUserByUsername(loginDTO?.username);

    if (!user) return null;

    const token = this.jwtService.sign(loginDTO);

    return `Bearer ${token}`;
  }

  getUser(req: Request) {
    const { authorization } = req.headers;

    if (!authorization) {
      return response.sendStatus(400);
    }

    const token = authorization.split(' ')[1];
    const secretKey = this.configService.get('JWT_SECRET');

    try {
      const decodedToken = verify(token, secretKey);
      decodedToken['password'] = undefined;

      return decodedToken;
    } catch (e) {
      console.error(e);
    }
  }

  async login(req: Request, res: Response) {
    const token = await this.loginUser(req.body);
    req.body.password = undefined;

    res.setHeader('Authorization', token);
    res.cookie('Authentication', token, {
      httpOnly: true,
      maxAge: this.configService.get('JWT_EXPIRATION_TIME'),
    });

    return res.json(token);
  }

  logout(res: Response) {
    res.clearCookie('Authentication');
    return res.sendStatus(200);
  }
}
