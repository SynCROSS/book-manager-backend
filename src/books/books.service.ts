import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { config } from 'dotenv';

config();

@Injectable()
export class BooksService {
  private BASE_URL =
    'http://www.librarything.com/api_getdata.php?userid=timspalding&responseType=json';

  async getAllBooks() {
    try {
      const {
        data: { books },
      } = await axios.get(this.BASE_URL);
      return books;
    } catch (e) {
      console.error(e);
    }
  }
}
