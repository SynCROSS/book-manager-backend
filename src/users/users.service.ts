import { Permission } from './../entity/permission.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository, getRepository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUserById(id: number) {
    return await this.userRepository.findOne(id).then(result => result);
  }

  async getUserByUsername(username: string) {
    return await this.userRepository
      .findOne({
        username,
      })
      .then(result => result);
  }

  async addUser(userDTO: UserDTO): Promise<User> {
    const hash = hashSync(userDTO.password, 10);

    const user = this.userRepository.create({
      ...userDTO,
      password: hash,
    });

    user.permission = await getRepository(Permission).findOne({
      permission_group: 'normal',
    });

    return await this.userRepository.save(user);
  }
}
