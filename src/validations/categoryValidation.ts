import { Category } from 'src/interfaces'
import * as yup from 'yup'

// Define Yup schema for Category
const categoryValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .max(255, 'Name cannot exceed 255 characters')
})

export default categoryValidationSchema
    