import SCHEMAS from '../../database/schemas'

import ERRORS, {
  sendError
} from '../servlet-error'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultPatch,
  defaultDelete,
  defaultGetDeep,
} from '../servlet-base'

import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('REST-USERS')

export const postUser = function(req, res, next) {

  try {
    defaultPost(SCHEMAS.USERS, req, res, next, (error) => {
      if (error && error.code === 11000) {
        if (error.message.indexOf('username') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_USERNAME_INUSE)
        } else if (error.message.indexOf('email') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_EMAIL_INUSE)
        }
      } else if (error && error.name === 'ValidationError') {
        sendError(LOGGER, res, {
          status: 400,
          error: error.message
        })
      } else {
        res.send(500, error)
      }
    })
  } catch (error) {
    res.send(500, error)
  }
}

export const getUser = function(req, res, next) {
  try {
    defaultGet(SCHEMAS.USERS, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}

export const putUser = function(req, res, next) {
  LOGGER.debug(JSON.stringify(req.body))
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
          status: 400,
          error: error.message
        })
      } else {
        res.send(500, error)
      }
    })
  } catch (error) {
    res.send(500, error)
  }
}

export const patchUser = function(req, res, next) {
  LOGGER.debug(JSON.stringify(req.body))
  try {
    defaultPatch(SCHEMAS.USERS, req, res, next, (error) => {
      if (error && error.code === 11000) {
        if (error.message.indexOf('username') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_USERNAME_INUSE)
        } else if (error.message.indexOf('email') !== -1) {
          sendError(LOGGER, res, ERRORS.USER_EMAIL_INUSE)
        }
      } else if (error && error.name === 'ValidationError') {
        sendError(LOGGER, res, {
          status: 400,
          error: error.message
        })
      } else {
        res.send(500, error)
      }
    })
  } catch (error) {
    res.send(500, error)
  }
}

export const deleteUser = function(req, res, next) {
  try {
    defaultDelete(SCHEMAS.USERS, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}

export const getUserThreads = function(req, res, next) {
  try {
    defaultGetDeep(SCHEMAS.THREADS, req, res, next, null)
  } catch (error) {
    res.send(500, error)
  }
}

const addRoutes = (app) => {
  app.get('/rest/users/:userId', getUser)
  app.put('/rest/users/:userId', putUser)
  app.patch('/rest/users/:userId', patchUser)
  app.delete('/rest/users/:userId', deleteUser)

  app.get('/rest/users/:userId/threads', getUserThreads)
}
export default addRoutes
