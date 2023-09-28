import {
  Response,
  Router,
} from 'express'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
  AuthRequest,
} from '../servlet-base'

import SCHEMAS from '../../database/schemas'

import ERRORS, {
  sendError
} from '../servlet-error'

import Logger from '@uncover/js-utils-logger'
import { HttpUtils } from '@uncover/js-utils'
import { User } from 'alpha-auth-common/build/services/auth/auth.model'

const LOGGER = new Logger('REST-USERS')
const multer = require('multer')

// Create router

export const usersRouterV1 = Router()

// GET '/:userId'

export const getUser = function(
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) {
  try {
    defaultGet(SCHEMAS.USERS, req, res, next, null)
  } catch (error) {
    res.status(HttpUtils.HttpStatus.ERROR).send(error)
  }
}
usersRouterV1.get('/:userId', getUser)


// PATCH '/:userId

export const patchUser = function(
  req: AuthRequest<{}, {}, User>,
  res: Response,
  next: () => void
) {
  try {
    defaultPut(SCHEMAS.USERS, req, res, next, (error) => {
      if (error && error.code === 11000) {
        if (error.message.indexOf('username') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_USERNAME_INUSE)
        } else if (error.message.indexOf('email') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_EMAIL_INUSE)
        }
      } else if (error && error.name === 'ValidationError') {
        sendError(LOGGER, res, {
          status: HttpUtils.HttpStatus.BAD_REQUEST,
          error: error.message
        })
      } else {
        res.status(HttpUtils.HttpStatus.ERROR).send(error)
      }
    })
  } catch (error) {
    res.status(HttpUtils.HttpStatus.ERROR).send(error)
  }
}
usersRouterV1.patch('/:userId', patchUser)


// POST /:userId/avatar

export const postUserAvatar = function(
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) {
  const upload = multer({ dest:'uploads/' }).single('avatar')
  upload(req, res, (error) => {
    // @ts-ignore
    if(!req.file) {
      res.status(HttpUtils.HttpStatus.BAD_REQUEST).send('No file provided')
    }
    if(error) {
      res.status(HttpUtils.HttpStatus.ERROR).send(error)
    }
    // @ts-ignore
    res.status(HttpUtils.HttpStatus.OK).json({file: req.file})
  })
}
usersRouterV1.post('/:userId/avatar', postUserAvatar)
