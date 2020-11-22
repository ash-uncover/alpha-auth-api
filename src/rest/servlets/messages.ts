import SCHEMAS from '../../database/schemas'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultPatch,
  defaultDelete,
} from '../servlet-base'

import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('REST-MESSAGES')

export const postMessage = function(req, res, next) {
  defaultPost(SCHEMAS.MESSAGES, req, res, next, null)
}

export const getMessage = function(req, res, next) {
  defaultGet(SCHEMAS.MESSAGES, req, res, next, null)
}

export const putMessage = function(req, res, next) {
  defaultPut(SCHEMAS.MESSAGES, req, res, next, null)
}

export const patchMessage = function(req, res, next) {
  defaultPatch(SCHEMAS.MESSAGES, req, res, next, null)
}

export const deleteMessage = function(req, res, next) {
  defaultDelete(SCHEMAS.MESSAGES, req, res, next, null)
}

const addRoutes = (app) => {
  app.post('/rest/messages/', postMessage)
  app.get('/rest/messages/:messageId', getMessage)
  app.put('/rest/messages/:messageId', putMessage)
  app.patch('/rest/messages/:messageId', patchMessage)
  app.delete('/rest/messages/:messageId', deleteMessage)
}
export default addRoutes