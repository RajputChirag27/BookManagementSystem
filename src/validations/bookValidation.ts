import { injectable } from 'inversify'
import * as yup from 'yup'

@injectable()
export class BookValidation {
    bookValidationSchema = yup.object().shape({
        title: yup.string().required('Title is required'),
        author: yup.string().required('Author is required'),
        category:yup.string().required(),
        ISBN: yup.string().required('ISBN is required'),
        
    })
}
