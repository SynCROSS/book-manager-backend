import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { BookDTO } from '../dto/book.dto';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async getBooks(numberOfBooks: number): Promise<Book[]> {
    const books = await this.bookRepository.find({
      take: numberOfBooks,
    });
    return books;
  }

  async searchBookByTitle(title: string): Promise<Book[]> {
    const books = await this.bookRepository.find({
      title: Like('%' + title + '%'),
    });

    return books;
  }

  async getBookById(id: number): Promise<boolean | Book> {
    const book = (await this.bookRepository.findOne(id)) ?? false;

    return book;
  }

  async isThereAnyBooks(id: number): Promise<boolean> {
    const book = await this.getBookById(id);

    if (!book) {
      return false;
    }
  }

  async addBook(bookDTO: BookDTO) {
    const book = this.bookRepository.create({
      ...bookDTO,
    });

    return await this.bookRepository.save(book);
  }

  async updateBookById(id: number, bookDTO: Partial<BookDTO>): Promise<Book> {
    if (!this.isThereAnyBooks(id)) {
      return null;
    }

    await this.bookRepository.update(id, bookDTO);

    return await this.bookRepository.findOne(id);
  }

  async deleteBookById(id: number): Promise<boolean> {
    if (!this.isThereAnyBooks(id)) {
      return false;
    }

    await this.bookRepository.softDelete(id);
    await this.bookRepository.restore(id);

    return true;
  }
}
