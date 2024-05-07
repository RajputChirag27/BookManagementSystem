import mongoose from "mongoose";
import { Book } from "../../interfaces";
import { Types } from "mongoose";


const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: Types.ObjectId,
        required: true
    },
    category: {
        type: Types.ObjectId,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    description: String,
    publishedYear: Number,
    authorName: String,
    categoryName: String,

    price: {
        type: Number,
        required: true
    }
});

const BookModel = mongoose.model<Book>('Book', bookSchema);

export default BookModel;
