import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Password } from 'src/entity/password.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Password])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
