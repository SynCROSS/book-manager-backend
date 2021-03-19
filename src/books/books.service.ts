import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from '../entity/book.entity';
import { BookDTO } from '../dto/book.dto';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
  ) {}
  // private BASE_URL =
  //   'http://www.librarything.com/api_getdata.php?userid=timspalding&responseType=json';

  addBook(bookDTO: BookDTO): Promise<Book> {
    const book = this.bookRepository.create({
      ...bookDTO,
    });

    return this.bookRepository.save(book);
  }

  async getAllBooks() {
    try {
      // const {
      //   data: { books },
      // } = await axios.get(this.BASE_URL);

      return this.bookRepository.find();
    } catch (e) {
      console.error(e);
    }
  }
}
