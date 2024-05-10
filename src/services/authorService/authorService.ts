import { injectable,inject } from "inversify";
import { AuthorRepository } from "../../repositories/authorRepository/authorRepository";
import { Author } from "src/interfaces";
import { PaginationService } from "../paginationService/paginationService";

@injectable()
    export class AuthorService{
        constructor(@inject(AuthorRepository) private authorRepository : AuthorRepository, @inject(PaginationService) private paginationService : PaginationService){}
        public async getAuthors(query){
            // console.log(query)
            const data = await this.authorRepository.getAuthors(query);
            return data;

            
        }

        public async createAuthor(author : Author){
            return await this.authorRepository.createAuthor(author);
        }

        async updateAuthor(id: string, author: Author): Promise<Author> {
            const result = await this.authorRepository.updateAuthor(id, author);
            console.log("Result", result)
            if (result) {
                return result;
            } else {
                throw new Error("Author not found")
            }
        }
        async deleteAuthor(id : string){
            return await this.authorRepository.deleteAuthor(id);
        }
    }