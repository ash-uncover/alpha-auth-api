import {
  Request,
  Response,
  Router,
} from 'express'

import {
  HttpUtils,
} from '@uncover/js-utils'

// Router

export const healthRouter = Router()

// GET '/'

export const getHealth = async (
  req: Request,
  res: Response,
  next: () => void
) => {
  res
    .status(HttpUtils.HttpStatus.OK)
    .json({
      server: true,
      database: true
    })
}
healthRouter.get('/', getHealth)
