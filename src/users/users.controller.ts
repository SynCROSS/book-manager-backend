import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(':id')
  getUserById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post('register')
  addUser(@Body() userDTO: UserDTO) {
    return this.userService.addUser(userDTO);
  }
}
