import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { UsersService } from './users.service';
import { BorrowDTO } from '../dto/borrow.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  getUserByUsername(@Body() borrowDTO: BorrowDTO) {
    return this.userService.getUserByUsername(borrowDTO.username);
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
