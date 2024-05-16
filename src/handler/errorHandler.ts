import { Request, Response, NextFunction } from 'express'
import CustomError from '../helpers/customError'
import { errorCodes } from '../constants'
import * as yup from 'yup'

const customErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let errorMessage = ''
    let statusCode = 500

    switch (err.name) {
      case 'MongoError':
        if (err.code === 11000) {
          errorMessage = 'Duplicate Field Value Entered'
          statusCode = errorCodes.NOT_FOUND
        }
        break

      case 'SyntaxError':
        errorMessage = 'Unexpected Syntax'
        statusCode = errorCodes.BAD_REQUEST
        break

      case 'ValidationError':
        if (err instanceof yup.ValidationError) {
          errorMessage = err.errors.join(', ') // Extracting the error messages
        } else {
          errorMessage = 'Validation Error'
        }
        statusCode = errorCodes.BAD_REQUEST
        break

      case 'CastError':
        errorMessage = 'Please provide a valid ID'
        statusCode = errorCodes.BAD_REQUEST
        break

      case 'TokenNotFoundError':
        errorMessage = 'Token Not Found'
        statusCode = errorCodes.NOT_FOUND
        break

      case 'TokenExpiredError':
        errorMessage = 'JWT expired'
        statusCode = errorCodes.UNAUTHORIZED
        break

      case 'JsonWebTokenError':
        errorMessage = 'JWT malformed'
        statusCode = errorCodes.UNAUTHORIZED
        break

      default:
        errorMessage = 'Server Error'
        break
    }

    // console.log('Custom Error Handler => ', err.name, errorMessage, statusCode)

    if (res) {
      return res.status(statusCode).json({
        success: false,
        error: errorMessage
      })
    } else {
      throw new Error('Response object is not defined')
    }
  } catch (error) {
    next(error) // Forward the error to the next error handler
  }
}

export default customErrorHandler
