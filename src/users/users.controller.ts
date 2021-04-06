import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUserByUsername(@Query('username') username: string) {
    return this.userService.getUserByUsername(username);
  }

  @Get('permission')
  getPermission(@Query('username') username: string) {
    return this.userService.getPermissionByUsername(username);
  }

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('register')
  addUser(@Body() userDTO: UserDTO) {
    return this.userService.addUser(userDTO);
  }
}
