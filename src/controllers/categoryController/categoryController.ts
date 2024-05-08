import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPatch, httpPost, httpPut, request, response } from 'inversify-express-utils';
import { CategoryService } from '../../services';
import { Category } from '../../interfaces';
import { errorCodes } from '../../constants';
import { IsAdminMiddleware, JwtAuthenticationMiddleware } from '../../middlewares';

@controller('/category',JwtAuthenticationMiddleware,IsAdminMiddleware)
export class CategoryController {
    constructor(@inject(CategoryService) private readonly categoryService: CategoryService) { }

    @httpGet('/')
    async getCategoryList(req: Request, res: Response): Promise<Response> {
        try {
            const { searchQuery, categoryName, sortField, sortOrder, pageNumber, pageSize } = req.query;

            // Provide default values for missing parameters
            const searchQueryOrDefault: string = searchQuery ? String(searchQuery) : ''; // Default search query
            const categoryNameOrDefault: string = categoryName ? String(categoryName) : ''; // Default category name
            const sortFieldOrDefault: string = sortField ? String(sortField) : 'name'; // Default sort field
            const sortOrderOrDefault: string = sortOrder ? String(sortOrder) : 'asc'; // Default sort order
            const pageNumberOrDefault: number = pageNumber ? parseInt(String(pageNumber), 10) : 1; // Default page number
            const pageSizeOrDefault: number = pageSize ? parseInt(String(pageSize), 10) : 10; // Default page size

            // Call the service method with provided or default values
            const result = await this.categoryService.getCategoryList(
                searchQueryOrDefault,
                categoryNameOrDefault,
                sortFieldOrDefault,
                sortOrderOrDefault,
                pageNumberOrDefault,
                pageSizeOrDefault
            );

            return res.json(result);
        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    @httpGet('/getAllCategories')
    async getAllCategories(req: Request, res: Response): Promise<void> {
        try {
            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;
            const categories = await this.categoryService.getAllCategories(page, limit);
            res.status(errorCodes.OK).json(categories);
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error });
        }
    }

    @httpGet('/getCategoryById')
    async getCategoryById(req: Request, res: Response): Promise<void> {
        const categoryId = req.body.id;
        try {
            const category = await this.categoryService.getCategoryById(categoryId);
            if (!category) {
                res.status(errorCodes.NOT_FOUND).json({ error: 'Category not found' });
                return;
            }
            res.status(errorCodes.OK).json(category);
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.message });
        }
    }

    @httpPost('/createCategory')
    async createCategory(@request() req: Request, @response() res: Response): Promise<void> {
        const newCategory: Category = req.body;
        try {
            const category = await this.categoryService.createCategory(newCategory);
            res.status(errorCodes.CREATED).json(category);
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.errorResponse.errmsg });
        }
    }

    @httpPatch('/updateCategory/:id')
    async updateCategory(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const name = req.body.name;
        console.log(id, name)
        try {
            const category: Category = await this.categoryService.updateCategory(id, name);
            console.log(category)
            if (!category) {
                res.status(errorCodes.NOT_FOUND).json({ error: 'Category not found' });
                return;
            }
            res.status(errorCodes.OK).json(category);
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error.errorResponse.errmsg });
        }
    }

    @httpDelete('/deleteCategory/:id')
    async deleteCategory(req: Request, res: Response): Promise<void> {
        const categoryId = req.params.id;
        try {
            const deleted = await this.categoryService.deleteCategory(categoryId);
            res.send({ deleted, message: "Deleted Successfully" })
            if (!deleted) {
                res.status(errorCodes.NOT_FOUND).json({ error: 'Category not found' });
                return;
            }
            res.status(errorCodes.NO_CONTENT).end();
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
        }
    }

    @httpGet('/searchCategories')
    async searchCategories(req: Request, res: Response): Promise<void> {
        const keyword = req.body.search;
        try {
            const categories = await this.categoryService.searchCategories(keyword);
            res.status(errorCodes.OK).json(categories);
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error });
        }
    }
}
