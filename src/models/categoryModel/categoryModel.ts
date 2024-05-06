import mongoose, { Schema } from "mongoose";
import { Category } from "src/interfaces/category/categoryInterface";

const CategorySchema = new Schema({
    name: { type: String, required: true , unique: true}
});

const CategoryModel = mongoose.model<Category>('Category', CategorySchema);
export default CategoryModel;