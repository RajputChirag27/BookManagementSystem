import { injectable } from "inversify";
import { Book } from "../../interfaces";
import { BookModel, CategoryModel, AuthorModel } from "../../models";



@injectable()
export class BookRepository {
    async getBooks(): Promise<Book[] > {
        try {
            const books = await BookModel.find()
             return books;
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

    async filterBooks(query?: string, minPrice?: number, maxPrice?: number): Promise<Book[]> {
        try {
            console.log('Query:', query);
            console.log('minPrice', minPrice);
            console.log('maxPrice', maxPrice);
    
            // Define the conditions for filtering
            const conditions: any[] = [
                {
                    $or: [
                        { title: query },
                        { authorName: query },
                        { categoryName: query },
                        { ISBN: query }
                    ].filter(Boolean)
                }
            ];
    
            // Check if publishedYear exists and add it to conditions
            if (!isNaN(Number(query))) { // Check if query can be converted to a number
                conditions.push({ publishedYear: Number(query) });
            }
    
            // Add price range condition
            conditions.push({ price: { $gte: minPrice, $lte: maxPrice } });
    
            // Perform the query using $and operator with conditions
            const books = await BookModel.find({ $and: conditions });
    
            console.log('Filtered Books:', books);
            return books;
        } catch (error) {
            throw new Error('Could not filter books');
        }
    }

    async filterBooksByPrice(minPrice: number, maxPrice: number): Promise<Book[]> {
        try {
            console.log('minPrice', minPrice);
            console.log('maxPrice', maxPrice);
    
            // Query books based on price range
            const books = await BookModel.find({ price: { $gte: minPrice, $lte: maxPrice } });
    
            console.log('Filtered Books:', books);
            return books;
        } catch (error) {
            throw new Error('Could not filter books');
        }
    }
    
    

}