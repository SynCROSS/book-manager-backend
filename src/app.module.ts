import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { Book } from './entity/book.entity';
import { UsersModule } from './users/users.module';
import { User } from './entity/user.entity';
import { Permission } from './entity/permission.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { object, string } from 'joi';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'mathmech',
      database: 'book_manager_app',
      entities: [Book, User, Permission],
      synchronize: true,
    }),
    ConfigModule.forRoot({
      validationSchema: object({
        JWT_SECRET: string().required(),
        JWT_EXPIRATION_TIME: string().required(),
      }),
    }),
    BooksModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
