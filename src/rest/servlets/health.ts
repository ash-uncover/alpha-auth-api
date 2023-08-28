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
    .send('<h4>ALPHA AUTH API</h4><p>Health Check OK</p>')
}
healthRouter.get('/', getHealth)
