import { injectable } from "inversify";
import { Book } from "../../interfaces";
import { BookModel, CategoryModel, AuthorModel } from "../../models";



@injectable()
export class BookRepository {
    async getBooks(page: number, limit: number): Promise<{ books: Book[], totalBooks: number }> {
        try {
            const books = await BookModel.find()
                .skip((page - 1) * limit)
                .limit(limit);
            const totalBooks = await BookModel.countDocuments();
            // const currentPage = Number(Math.ceil(totalBooks/limit));
            // console.log(currentPage)
            return { books, totalBooks };
        } catch (error) {
            throw new Error('Could not retrieve books');
        }
    }

    async createBook(bookData: Book): Promise<Book> {
        try {
            const category = await CategoryModel.findById(bookData.category)
            const author = await AuthorModel.findById(bookData.author);
            console.log(category, author)
            bookData.categoryName = category.name;
            bookData.authorName = author.name;
            const book = new BookModel(bookData);
            return await book.save();
        } catch (error) {
            throw new Error('Could not create book');
        }
    }

    async getBookById(id: string): Promise<Book> {
        try {
            return await BookModel.findById(id);
        } catch (error) {
            throw new Error('Could not retrieve book');
        }
    }

    async updateBook(id: string, bookData: Book): Promise<Book> {
        try {
            return await BookModel.findByIdAndUpdate(id, bookData, { new: true });
        } catch (error) {
            throw new Error('Could not update book');
        }
    }

    async deleteBook(id: string): Promise<Book> {
        try {
            return await BookModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error('Could not delete book');
        }
    }

    async searchBooks(query): Promise<Book[]> {
        try {
            return await BookModel.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { authorName: { $regex: query, $options: 'i' } }
                ]
            });
        } catch (error) {
            throw new Error('Could not search books');
        }
    }

    async filterBooks(query, minPrice: number, maxPrice: number): Promise<Book[]> {
        try {
            console.log('Query:', query);
            const books = await BookModel.find({
                $and: [
                    {
                        $or: [
                            { title: query },
                            { authorName: query },
                            { categoryName: query },
                            { publishedYear: Number(query) },
                            { ISBN: query }
                        ]
                    },
                    { price: { $gte: minPrice, $lte: maxPrice } }
                ]
            });
            console.log('Filtered Books:', books);
            return books;
        } catch (error) {
            throw new Error('Could not filter books');
        }
    }


}