import { Document } from "mongoose";

interface Book extends Document {
    title: string;
    author: string;
    category: string;
    ISBN?: string;
    description?: string;
    publishedYear?: number;
    authorName?: string;
    categoryName?: string;
    price: number;
}

export default Book;
