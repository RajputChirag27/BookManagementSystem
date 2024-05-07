import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, httpPut, httpDelete, httpPatch } from 'inversify-express-utils';
import { BookService } from '../../services';
import { Book } from '../../interfaces';

@controller('/books')
export class BookController {

  constructor(@inject(BookService) private bookService: BookService) { }

  @httpPost('/')
  async createBook(req: Request, res: Response) {
    try {
      const bookData: Book = req.body;
      const book = await this.bookService.createBook(bookData);
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Could not create book', error: error.message });
    }
  }

  @httpGet('/')
  async getBooks(req: Request, res: Response) {
    try {
      const page: number = parseInt(req.query.page as string) || 1;
      const limit: number = parseInt(req.query.limit as string) || 10;
      const { books, totalBooks } = await this.bookService.getBooks(page, limit);
      res.status(200).json({ books, totalBooks, page });
    } catch (error) {
      res.status(500).json({ message: 'Could not retrieve books', error: error.message });
    }
  }

  @httpPatch('/:id')
  async updateBook(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const bookData: Book = req.body;
      const updatedBook = await this.bookService.updateBook(id, bookData);
      if (!updatedBook) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json(updatedBook);
      }
    } catch (error) {
      res.status(500).json({ message: 'Could not update book', error: error.message });
    }
  }

  @httpDelete('/:id')
  async deleteBook(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const deletedBook = await this.bookService.deleteBook(id);
      if (!deletedBook) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json({ message: 'Book deleted successfully' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Could not delete book', error: error.message });
    }
  }


  @httpGet('/filter') 
  async filterBooks(req: Request, res: Response) {
    try {
      const query = req.query.query || '';
      const minPrice: number = parseFloat(req.query.minPrice as string) || 0;
      const maxPrice: number = parseFloat(req.query.maxPrice as string) || Number.POSITIVE_INFINITY;
      if(query === ''){
        const book = await this.bookService.filterBooksByPrice(minPrice,maxPrice);
        res.send(book);
        return;
      }
      const books = await this.bookService.filterBooks(query,minPrice,maxPrice);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Could not filter books', error: error.message });
    }
  }

  @httpGet('/search') 
  async searchBooks(req: Request, res: Response) {
    try {
      const query: string = (req.query.q as string) || '';
      const books = await this.bookService.searchBooks(query);
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Could not search books', error: error.message });
    }
  }

  @httpGet('/:id')
  async getBookById(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const book = await this.bookService.getBookById(id);
      if (!book) {
        res.status(404).json({ message: 'Book not found' });
      } else {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(500).json({ message: 'Could not retrieve book', error: error.message });
    }
  }
}
