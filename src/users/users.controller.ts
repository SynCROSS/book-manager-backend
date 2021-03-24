import { Body, Controller, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/dto/user.dto';
import { User } from 'src/entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('profile/:id')
  getProfileById(@Param('id') id: number): Promise<User> {
    return this.userService.getProfileById(id);
  }

  @Post('register')
  addUser(@Body() userDTO: UserDTO): Promise<User> {
    return this.userService.addUser(userDTO);
  }
}
