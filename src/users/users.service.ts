import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { UserDTO } from '../dto/user.dto';
import { hashSync } from 'bcrypt';
import { Password } from 'src/entity/password.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,
  ) {}

  async addUser(userDTO: UserDTO): Promise<User> {
    const hash = hashSync(userDTO.password, 10);

    const user = this.userRepository.create({
      ...userDTO,
      password: hash,
    });

    const hashedPassword = this.passwordRepository.create({
      hash,
      owner: user,
    });

    await this.passwordRepository.save(hashedPassword);

    return await this.userRepository.save(user);
  }
}
