import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from '../dto/book.dto';
import { Book } from 'src/entity/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks(@Query('limit') limit: number) {
    return this.booksService.getBooks(limit);
  }

  @Get('search')
  searchBookByTitle(@Query('title') title: string) {
    return this.booksService.searchBookByTitle(title);
  }

  @Get(':id')
  getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
  }

  @Post()
  addBook(@Body() bookDTO: BookDTO): Promise<Book> {
    return this.booksService.addBook(bookDTO);
  }
}
