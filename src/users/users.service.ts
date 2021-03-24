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

  async addUser(userDTO: UserDTO): Promise<User> {
    const hash = hashSync(userDTO.password, 10);

    const user = this.userRepository.create({
      ...userDTO,
      password: hash,
    });

    return await this.userRepository.save(user);
  }

  async getProfileById(id: number) {
    return await this.userRepository.findOne(id);
  }
}
