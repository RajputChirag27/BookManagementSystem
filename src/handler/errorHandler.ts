import { Request, Response, NextFunction } from 'express'
// import CustomError from '../helpers/customError'
import { errorCodes } from '../constants'
import * as yup from 'yup'
import CustomError from '../helpers/customError'

const customErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(
      'Custom Error Handler => ',
      err.name,
      err.message,
      err.statusCode,
      err.message
    )

    if (res) {
      return res.status(err.statusCode).json({
        success: false,
        error: err.message,
      })
    } else {
      throw new CustomError(
        'Response object is not defined',
        errorCodes.INTERNAL_SERVER_ERROR,
        'Internal Server Error'
      )
    }
  } catch (error) {
    console.log(error) // Forward the error to the next error handler
  } finally{
    res.send("Server Error");
  }
}

export default customErrorHandler
