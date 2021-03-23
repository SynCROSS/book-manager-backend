import { getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Book } from './entity/book.entity';
import { BookDTO } from './dto/book.dto';

@Injectable()
export class AppService {
  async getBookData() {
    const BASE_URL =
      'http://www.librarything.com/api_getdata.php?userid=timspalding&responseType=json';
    try {
      const {
        data: { books },
      } = await axios.get(BASE_URL);

      for (const book in books) {
        const b = books[book];
        const bookRepository = getRepository(Book);
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
        // console.log();
        await bookRepository.save(
          bookRepository.create({
            ...newBook,
          }),
        );
      }
    } catch (e) {
      console.error(e);
    }
  }
}
