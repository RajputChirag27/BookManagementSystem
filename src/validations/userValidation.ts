import * as yup from 'yup'
import { User } from '../interfaces'

// Define Yup schema
const userValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username cannot exceed 50 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  role: yup
    .string()
    .oneOf(['user', 'admin', 'author'], 'Invalid role')
    .required('Role is required')
})

export default userValidationSchema
