import { injectable } from "inversify";
import { Author } from "../../interfaces";
import { AuthorModel } from "../../models";
import { errorCodes } from "../../constants";
import { errorMessages } from "../../constants/message";


@injectable()
export class AuthorRepository {

    public async getAuthors(queries) {
        try {
            let queryObject = { ...queries };
         
            // Basic Filtaration 
            const excludeFields = ['page', 'sort', 'limit', 'fields'];
            excludeFields.forEach(item => delete queryObject[item]);

            // Advance Filtering

            let queryString = JSON.stringify(queryObject)

            queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

            queryObject = JSON.parse(queryString);

        

            // Search on the basis of the name of the Author

            if (queryObject.name) {
                queryObject.name = new RegExp(queryObject.name, 'i');
            } 
            if(queryObject.nationality){
                queryObject.nationality = new RegExp(queryObject.nationality, 'i');
            }

         

            let query = AuthorModel.find({ ...queryObject });
            const countQuery = AuthorModel.find({ ...queryObject });

            // Sorting
            if (queries.sort) {
                const sortBy = (queries.sort as string).split(',').join(' ');
                query = query.sort(sortBy);
            } else {
                query = query.sort({ createdAt: - 1 })
            }

            // Projection 
            if (queries.fields) {
                const fields = (queries.fields as string).split(',').join(' ');
                query = query.select(fields);
            } else {
                query = query.select('-__v');
            }


            // Pagination
            const page = parseInt(queries.page as string) || 1;
            const limit = parseInt(queries.limit as string) || 10;
            const skip = (page - 1) * limit;

            const totalRecords = await countQuery.countDocuments();

            query = query.skip(skip).limit(limit);

            let numOfRecords = 0;

            if (queries.page) {
                numOfRecords = await AuthorModel.countDocuments({ ...queryObject });
                if (skip > numOfRecords) {
                    throw Object.assign(new Error(errorMessages[404]), { statusCode: errorCodes.NOT_FOUND });
                }
            }
            const authors = await query;

            return Object.assign({
                data: {
                    status: true,
                    data: authors,
                    totalPages: Math.ceil(totalRecords / limit),
                    page,
                    limit,
                    totalRecords
                }
            }, { statusCode: errorCodes.OK });
        }
        catch (err) {
            throw Object.assign(new Error("Internal Server Error!"), { statusCode: errorCodes.INTERNAL_SERVER_ERROR });
        }
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