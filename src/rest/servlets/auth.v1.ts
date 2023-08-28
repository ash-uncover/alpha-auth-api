import {
  Response,
  Router,
} from 'express'

import {
  HttpUtils,
} from '@uncover/js-utils'

import {
  AuthRequest
} from '../servlet-base'

// Router

export const authRouterV1 = Router()

// GET '/'

export const getAuth = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
  res
    .status(HttpUtils.HttpStatus.OK)
    .send({ userId: req.__context.userId })
}
authRouterV1.get('/', getAuth)

// POST '/'

export const postAuth = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
  // TODO
  res
    .status(HttpUtils.HttpStatus.OK)
    .send({ userId: req.__context.userId })
}
authRouterV1.post('/', postAuth)

// DELETE '/'

export const deleteAuth = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
  // TODO
  res
    .status(HttpUtils.HttpStatus.OK)
    .send()
}
authRouterV1.delete('/', deleteAuth)
