import { injectable,inject } from "inversify";
import { AuthorRepository } from "../../repositories/authorRepository/authorRepository";
import { Author } from "src/interfaces";

@injectable()
    export class AuthorService{
        constructor(@inject(AuthorRepository) private authorRepository : AuthorRepository){}
        public async getAuthors(){
            return await this.authorRepository.getAuthors();
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