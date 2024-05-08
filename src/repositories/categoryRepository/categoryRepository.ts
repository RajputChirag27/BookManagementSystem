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


    async getCategoryList(searchQuery, categoryName, sortField, sortOrder, pageNumber, pageSize) {
        const pipeline = [];
    
        // Match stage for search query
        if (searchQuery) {
            pipeline.push({
                $match: {
                    name: { $regex: searchQuery, $options: 'i' } // Case-insensitive search
                }
            });
        }
    
        // Match stage for filtering by categoryName
        if (categoryName) {
            pipeline.push({
                $match: {
                    name: categoryName,
                }
            });
        }
    
        // Sort stage
        if (sortField && sortOrder) {
            const sortStage = {};
            sortStage[sortField] = sortOrder === 'asc' ? 1 : -1;
            pipeline.push({ $sort: sortStage });
        }
    
        // Pagination stages
        const skip = (pageNumber - 1) * pageSize;
        pipeline.push({ $skip: skip });
        pipeline.push({ $limit: pageSize });
    
        // Aggregation to count total filtered documents
        pipeline.push({
            $group: {
                _id: null,
                totalResults: { $sum: 1 }
            }
        });
    
        // Execute aggregation pipeline
        const results = await CategoryModel.aggregate(pipeline);
    
        // Extract total results count
        const totalResults = results.length > 0 ? results[0].totalResults : 0;
    
        // Execute aggregation pipeline to retrieve paginated data
        pipeline.pop(); // Remove the $group stage for totalResults
        const categoryList = await CategoryModel.aggregate(pipeline);
    
        // Calculate total pages
        const totalPages = Math.ceil(totalResults / pageSize);
    
        return {
            categoryList,
            totalResults,
            totalPages,
            filteredPages: Math.ceil(categoryList.length / pageSize),
            currentPage: pageNumber
        };
    }
    



}