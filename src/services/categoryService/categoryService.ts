import { inject, injectable } from "inversify";
import { CategoryRepository } from "../../repositories/";
import { Category } from "../../interfaces/categoryInterface/categoryInterface";
import { PaginationService } from "../paginationService/paginationService";

@injectable()
export default class CategoryService {
    constructor(@inject(CategoryRepository) private categoryRepository: CategoryRepository, @inject(PaginationService) private paginationService: PaginationService) { }

    async getAllCategories(page: number, limit: number): Promise<{ pagination: Category[],entriesFound : number, page: number, totalPages: number }> {
        const data = await this.categoryRepository.getAllCategories();
        const pagination = await this.paginationService.paginate(data, page, limit);
        const totalPages = await this.paginationService.getTotalPages(data, limit);
        const entriesFound = data.length;
        return { pagination,entriesFound, page, totalPages }
    }

    async getCategoryList(searchQuery, categoryName, sortField, sortOrder, pageNumber, pageSize) {
        const data = await this.categoryRepository.getCategoryList(searchQuery, categoryName, sortField, sortOrder,pageNumber,pageSize);
        return data;
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
    async deleteCategory(id: string) {
        return await this.categoryRepository.deleteCategory(id);
    }

    async searchCategories(keyword: string) {
        return await this.categoryRepository.searchCategories(keyword);
    }

}
