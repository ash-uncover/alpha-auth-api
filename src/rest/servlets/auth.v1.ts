import {
  Response,
  Router,
} from 'express'

import {
  EncodeUtils,
  HttpUtils,
} from '@uncover/js-utils'

import {
  AuthRequest
} from '../servlet-base'
import { Credentials } from 'alpha-auth-common/build/services/auth/auth.model'
import { AccountModel, UserModel } from '../../database/schemas'
import { useAuth } from '../middleware'

// Router

export const authRouterV1 = Router()

// POST '/'

export const postAuth = async (
  req: AuthRequest<{}, {}, Credentials>,
  res: Response,
  next: () => void
) => {
  const {
    username,
    password,
  } = req.body
  const account = await AccountModel.findOne({ username, password }).exec()

  if (!account) {
    return res
      .status(HttpUtils.HttpStatus.UNAUTHORIZED)
      .send()
  }

  const user = await UserModel.findOne({ id: account.userId }).select('-_id -__v').exec()
  if (!user) {
    return res
      .status(HttpUtils.HttpStatus.ERROR)
      .send()
  }

  res
    .status(HttpUtils.HttpStatus.OK)
    .json({
      user: user.toJSON(),
      token: EncodeUtils.encodeBasicHeader(username, password)
    })
}
authRouterV1.post('/', postAuth)

// GET '/'

export const getAuth = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
  const user = await UserModel.findOne({ id: req.__context.userId }).select('-_id -__v').exec()
  if (!user) {
    return res
      .status(HttpUtils.HttpStatus.ERROR)
      .send()
  }

  res
    .status(HttpUtils.HttpStatus.OK)
    .json(user)
}
authRouterV1.get('/', useAuth, getAuth)

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
authRouterV1.delete('/', useAuth, deleteAuth)
