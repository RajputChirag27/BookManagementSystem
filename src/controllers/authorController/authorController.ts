import { NextFunction, Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete, httpPatch, request, response, Middleware, next } from "inversify-express-utils";
import { AuthorService } from "../../services/authorService/authorService";
import { Author } from "../../interfaces";
import { IsAdminMiddleware, JwtAuthenticationMiddleware, authenticateJwt } from "../../middlewares";
import { errorCodes } from "../../constants";
import { errorHandler } from "../../handler/errorHandler";



@controller('/author', JwtAuthenticationMiddleware, IsAdminMiddleware)
export class AuthorController {
    constructor(@inject(AuthorService) private authorService: AuthorService) { }

    @httpGet('/getAuthors',errorHandler)
    public async getAuthors(@request() req: Request, @response() res: Response, @next() next : NextFunction) {
        try {
            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;
            const authors = await this.authorService.getAuthors(page, limit);
            res.send(authors)
         
        } catch (err) {
            // res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: err });
            next(err);
        }
    }

    @httpPost('/createAuthor',)
    public async createAuthor(@request() req: Request, @response() res: Response, @next() next : NextFunction) {
        try {
            const author = req.body;
            const authors = await this.authorService.createAuthor(author);
            res.send(authors)
        } catch (err) {
            // res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: err });
            // next(err);
            errorHandler(err,res);
        }
    }

    @httpPatch('/updateAuthor/:id')
    async updateAuthor(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const authors = req.body;
        try {
            const author: Author = await this.authorService.updateAuthor(id, authors);
            console.log(author)
            if (!author) {
                res.status(errorCodes.NOT_FOUND).json({ error: 'Category not found' });
                return;
            }
            res.status(200).json(author);
        } catch (error) {
            res.status(errorCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error', message: error });
        }
    }

    @httpDelete('/deleteAuthor/:id')
    async deleteAuthor(req: Request, res: Response): Promise<void> {
        const categoryId = req.params.id;
        try {
            const deleted = await this.authorService.deleteAuthor(categoryId);
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

}