import { injectable } from "inversify";
import { Author } from "../../interfaces";
import { AuthorModel } from "../../models";

@injectable()
export class AuthorRepository {

    public async getAuthors(): Promise<Author[]> {
        const pipeline = [];

        return await AuthorModel.find();
    }
    public async createAuthor(author: Author): Promise<Author> {
        if (author) {
            return await AuthorModel.create(author);
        } else {
            throw new Error("Author is not defined");
        }
    }

    async updateAuthor(id: string, author: Author): Promise<Author | null> {
        try {
            const updated = await AuthorModel.findOneAndUpdate({ _id: id }, author, { new: true }).exec();
            return updated;
        } catch (err) {
            throw (err);
        }
    }
    async deleteAuthor(id: string) {
        try {
            const deleted = await AuthorModel.findOneAndDelete({ _id: id }).exec();
            return deleted;
        } catch (err) {
            throw (err)
        }
    }
}