import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpDelete, httpPatch, request, response, Middleware } from "inversify-express-utils";
import { AuthorService } from "../../services/authorService/authorService";
import { Author } from "../../interfaces";
import { IsAdminMiddleware, JwtAuthenticationMiddleware, authenticateJwt } from "../../middlewares";
import container from "../../inversifyConfig";


@controller('/author', JwtAuthenticationMiddleware, IsAdminMiddleware)
export class AuthorController {
    constructor(@inject(AuthorService) private authorService: AuthorService) { }

    @httpGet('/getAuthors')
    public async getAuthors(@request() req: Request, @response() res: Response) {
        try {
            const page: number = parseInt(req.query.page as string) || 1;
            const limit: number = parseInt(req.query.limit as string) || 10;
            const authors = await this.authorService.getAuthors(page, limit);
            res.send(authors)
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error', message: err });
        }
    }

    @httpPost('/createAuthor')
    public async createAuthor(@request() req: Request, @response() res: Response) {
        try {
            const author = req.body;
            const authors = await this.authorService.createAuthor(author);
            res.send(authors)
        } catch (err) {
            res.status(500).json({ error: 'Internal Server Error', message: err });
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
                res.status(404).json({ error: 'Category not found' });
                return;
            }
            res.status(200).json(author);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error', message: error });
        }
    }

    @httpDelete('/deleteAuthor/:id')
    async deleteAuthor(req: Request, res: Response): Promise<void> {
        const categoryId = req.params.id;
        try {
            const deleted = await this.authorService.deleteAuthor(categoryId);
            res.send({ deleted, message: "Deleted Successfully" })
            if (!deleted) {
                res.status(404).json({ error: 'Category not found' });
                return;
            }
            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

}