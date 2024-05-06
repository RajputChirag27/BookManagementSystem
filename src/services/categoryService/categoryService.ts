import { inject, injectable } from "inversify";
import { CategoryRepository } from "../../repositories/";
import { Category } from "../../interfaces/category/categoryInterface";

@injectable()
export default class CategoryService {
    constructor(@inject(CategoryRepository) private categoryRepository: CategoryRepository) { }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories();
    }
    async getCategoryById(id: string): Promise<Category> {
        return await this.categoryRepository.getCategoryById(id);
    }
    async createCategory(category: Category) {
        return await this.categoryRepository.createCategory(category);
    }
    async updateCategory(id: string, category: Category): Promise<Category> {
        const result = await this.categoryRepository.updateCategory(id, category);
        console.log("Result", result)
        if (result) {
            return result;
        } else {
            throw new Error("Category not found")
        }
    }
    async deleteCategory(id : string){
        return await this.categoryRepository.deleteCategory(id);
    }
    // async getCategoryByProductId(id : string){
    //     return await this.categoryRepository.getCategoryByProductId(id);
    // }
    async searchCategories(keyword: string) {
        return await this.categoryRepository.searchCategories(keyword);
    }

}
