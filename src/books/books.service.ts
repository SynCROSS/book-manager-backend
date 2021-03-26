import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { BookDTO } from '../dto/book.dto';
import { User } from 'src/entity/user.entity';
import axios from 'axios';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}

  async getBookData() {
    const BASE_URL =
      'http://www.librarything.com/api_getdata.php?userid=timspalding&responseType=json';
    try {
      const {
        data: { books },
      } = await axios.get(BASE_URL);

      for (const book in books) {
        const b = books[book];

        const newBook: BookDTO = {
          book_id: +b.book_id,
          title: b.title,
          author_lf: b.author_lf ?? '',
          author_fl: b.author_fl ?? '',
          ISBN: isNaN(+b.ISBN) ? 0 : +b.ISBN,
          rating: isNaN(+b.rating) ? 0 : +b.rating,
          language_main: b.language_main ?? '',
          language_secondary: b.language_secondary ?? '',
          language_original: b.language_original ?? '',
          cover: b.cover,
          entry_stamp: +b.entry_stamp,
        };

        await this.bookRepository.save(
          this.bookRepository.create({
            ...newBook,
          }),
        );
      }
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getAllBooks(numberOfBooks: number): Promise<Book[]> {
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
    return true;
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
