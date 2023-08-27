import {
  Response,
  Router,
} from 'express'

import {
  HttpUtils,
} from '@uncover/js-utils'

import {
  Credentials
} from 'alpha-auth-common/build/services/auth/auth.model'

import {
  AuthRequest
} from '../servlet-base'

// Router

export const authRouter = Router()

// GET /

export const getAuth = async (
  req: AuthRequest<{}, {}, Credentials>,
  res: Response,
  next: () => void
) => {
  res
    .status(HttpUtils.HttpStatus.OK)
    .send({ userId: req.__context.userId })
}
authRouter.get('/', getAuth)

// POST /

export const postAuth = async (
  req: AuthRequest<{}, {}, Credentials>,
  res: Response,
  next: () => void
) => {
  // TODO
  res
    .status(HttpUtils.HttpStatus.OK)
    .send({ userId: req.__context.userId })
}
authRouter.post('/', postAuth)

// DELETE /

export const deleteAuth = async (
  req: AuthRequest<{}, {}, Credentials>,
  res: Response,
  next: () => void
) => {
  // TODO
  res
    .status(HttpUtils.HttpStatus.OK)
    .send()
}
authRouter.delete('/', deleteAuth)
