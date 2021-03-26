import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  getData() {
    return this.appService.getBookData();
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser(@Req() req: Request) {
    req.body.password = undefined;
    return req.body;
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const cookie = await this.authService.loginUser(req.body);

    res.setHeader('Set-Cookie', cookie);

    return res.send(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    res.setHeader('Set-Cookie', `Authentication=; HttpOnly; Path=/; Max-Age=0`);
    return res.sendStatus(200);
  }
}
