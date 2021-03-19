import { Body, Controller, Get, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from '../dto/book.dto';
import { Book } from 'src/entity/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Post()
  addBook(@Body() bookDTO: BookDTO): Promise<Book> {
    return this.bookService.addBook(bookDTO);
  }

  @Get()
  getAllBooks() {
    return this.bookService.getAllBooks();
  }
}
