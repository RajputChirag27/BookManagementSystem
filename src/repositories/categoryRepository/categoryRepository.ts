import { injectable } from "inversify"
import { Category } from "../../interfaces"
import { CategoryModel } from "../../models"

@injectable()
export default class CategoryRepository {
    async getAllCategories(): Promise<Category[]> {
        try {
            return await CategoryModel.find();
        } catch (err) {
            throw (err);
        }
    }
    async getCategoryById(id: string): Promise<Category> {
        try {
            return await CategoryModel.findOne({ _id: id });
        } catch (err) {
            throw (err)
        }
    }
    async createCategory(category: Category): Promise<Category> {
        try {
            return await CategoryModel.create(category);
        } catch (err) {
            throw (err);
        }
    }
    async updateCategory(id: string, category: Category): Promise<Category|null> {
        try{
            const updated = await CategoryModel.findOneAndUpdate({_id : id},  {name: category}, {new : true}).exec();
            return updated;
        } catch(err){
            throw(err);
        }
    }
    async deleteCategory(id : string){
        try{
            const deleted = await CategoryModel.findOneAndDelete({_id : id}).exec();
            return deleted;
        }catch(err){
            throw(err)
        }
    }
    // async getCategoryByProductId(id : string){

    // }
    async searchCategories(keyword: string): Promise<Category> {
        try {
            return await CategoryModel.findOne({ name: keyword })
        } catch (err) {
            throw (err);
        }
    }
}