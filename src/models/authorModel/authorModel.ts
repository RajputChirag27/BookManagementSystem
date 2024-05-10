import mongoose, { Schema } from "mongoose";
import Author from "../../interfaces/authorInterface/authorInterface";

const AuthorSchema = new Schema<Author>({
    name: { type: String, required: true, unique: true },
    email: {type: String, required: true, unique: true},
    biography: { type: String, required: true },
    nationality: { type: String, required: true },
    age : [{type: Number, required: true}],
    books: [{ type: Schema.Types.ObjectId, ref: 'Book' }] // Assuming 'Book' is the model name for books
});

// Create and export the Author model
const AuthorModel = mongoose.model<Author>('Author', AuthorSchema);
export default AuthorModel;