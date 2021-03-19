import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  addUser(userDTO: UserDTO): Promise<User> {
    const user = this.userRepository.create({
      ...userDTO,
    });

    return this.userRepository.save(user);
  }
}
