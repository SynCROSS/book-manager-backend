import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, getRepository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { BookDTO } from '../dto/book.dto';
import { User } from 'src/entity/user.entity';
import axios from 'axios';
// import { AuthService } from '../auth/auth.service';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>, // private readonly authService: AuthService,
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
    for (const book of books) {
      book.createdAt = undefined;
      book.updatedAt = undefined;
      book.deletedAt = undefined;
    }
    return books;
  }

  async searchBookByTitle(title: string): Promise<Book[]> {
    const books = await this.bookRepository.find({
      title: Like('%' + title + '%'),
    });

    return books;
  }

  async getBookById(id: number) {
    const book = await this.bookRepository.findOne(id);
    book?.createdAt ? undefined : null;
    book?.updatedAt ? undefined : null;
    book?.deletedAt ? undefined : null;
    return book;
  }

  async addBook(bookDTO: BookDTO) {
    const res = await this.getBookById(bookDTO?.book_id);
    if (res) {
      return null;
    }

    const book = this.bookRepository.create({
      ...bookDTO,
    });

    return await this.bookRepository.save(book);
  }

  async updateBookById(id: number, bookDTO: Partial<BookDTO>): Promise<Book> {
    const res = await this.getBookById(id);
    if (!res) {
      return null;
    }

    await this.bookRepository.update(id, bookDTO);

    return await this.bookRepository.findOne(id);
  }

  async checkOutBook(id: number, username: string) {
    try {
      const res = await this.getBookById(id);
      if (!res) {
        return null;
      }

      const user = await getRepository(User).findOne({
        username,
      });

      if (user.username ?? false) {
        const orderedBook = await this.bookRepository.findOne({
          book_id: id,
        });
        orderedBook.borrower = user;
        await this.bookRepository.save(orderedBook);
        return orderedBook.borrower.username;
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  }

  async checkInBook(id: number, username: string) {
    const borrowedBook = await this.getBookById(id);
    if (!borrowedBook) {
      return null;
    }

    const user = await getRepository(User).findOne({
      username,
    });

    if (user.username ?? false) {
      const orderedBooks = await this.bookRepository.find({
        relations: ['permission'],
      });

      for (const orderedBook of orderedBooks) {
        if (
          borrowedBook?.book_id === orderedBook?.book_id &&
          orderedBook?.borrower.id === user.id
        ) {
          orderedBook.borrower = null;
          await this.bookRepository.save(orderedBook);
          return orderedBook.borrower;
        }
      }
    }
    return null;
  }

  async deleteBookById(id: number) {
    const res = await this.getBookById(id);
    if (!res) {
      return false;
    }

    await this.bookRepository.softDelete(id);

    return true;
  }
}
