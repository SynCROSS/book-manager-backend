import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDTO } from '../dto/book.dto';
import { Book } from 'src/entity/book.entity';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks(@Query('limit') limit: number) {
    return this.booksService.getAllBooks(limit);
  }

  @Get('insert')
  getBookData() {
    return this.booksService.getBookData();
  }

  @Get('search')
  searchBookByTitle(@Query('title') title: string) {
    return this.booksService.searchBookByTitle(title);
  }

  @Get(':id')
  getBookById(@Param('id') id: number) {
    return this.booksService.getBookById(id);
  }

  @Post('add')
  addBook(@Body() bookDTO: BookDTO) {
    return this.booksService.addBook(bookDTO);
  }

  @Patch('checkOut/:id')
  checkOutBook(@Param('id') id: number) {
    return this.booksService.checkOutBook(id);
  }

  @Patch('checkIn/:id')
  checkInBook(@Param('id') id: number) {
    return this.booksService.checkInBook(id);
  }

  @Patch('update/:id')
  updateBookById(@Param('id') id: number, @Body() bookDTO: Partial<BookDTO>) {
    return this.booksService.updateBookById(id, bookDTO);
  }

  @Delete(':id')
  deleteBookById(@Param('id') id: number) {
    return this.booksService.deleteBookById(id);
  }
}
