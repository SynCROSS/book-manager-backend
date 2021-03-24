import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { BookDTO } from '../dto/book.dto';
import { User } from 'src/entity/user.entity';
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

  async getBookById(id: number): Promise<Book> {
    const book = await this.bookRepository.findOne(id);

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

  async checkOutBook(id: number) {
    if (!this.isThereAnyBooks(id)) {
      return null;
    }

    // const user = await userRepository.findOne()
    // const book = await this.getBookById(id)
    // user.borrowedBooks = [...user.borrowedBooks,book]
  }
  async checkInBook(id: number) {
    if (!this.isThereAnyBooks(id)) {
      return null;
    }

    // const user = await userRepository.findOne()
    // const book = await this.getBookById(id)
    // user.borrowedBooks = [...user.borrowedBooks,book]
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
