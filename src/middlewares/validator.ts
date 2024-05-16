import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { inject } from 'inversify'
import { BaseMiddleware } from 'inversify-express-utils'
import { ParsedQs } from 'qs'
import customErrorHandler from '../handler/errorHandler'
import { AuthorValidation } from '../validations/authorValidation'

export class ValidatorMiddleWare extends BaseMiddleware {
  constructor(
    @inject(AuthorValidation) private authorValidation: AuthorValidation
  ) {
    super()
  }
  async handler(
    req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
    res: Response<any, Record<string, any>>,
    next: NextFunction
  ): Promise<void> {
    try {
      await this.authorValidation.authorValidationSchema.validate(req.body, {
        abortEarly: false
      })
      // If validation succeeds, proceed to the next middleware or route handler
      next()
    } catch (err) {
        console.log(err)
      customErrorHandler(err, req, res, next)
    }
  }
}
