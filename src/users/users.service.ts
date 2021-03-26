import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { hashSync } from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number): Promise<boolean | User> {
    const user = (await this.userRepository.findOne(id)) ?? false;

    return user;
  }

  async getUserByUsername(username: string): Promise<boolean | User> {
    const user =
      (await this.userRepository.findOne({
        username,
      })) ?? false;

    return user;
  }

  async addUser(userDTO: UserDTO): Promise<User> {
    const hash = hashSync(userDTO.password, 10);

    const user = this.userRepository.create({
      ...userDTO,
      password: hash,
    });

    return await this.userRepository.save(user);
  }
}
