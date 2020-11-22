import SCHEMAS from '../../database/schemas'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
} from '../servlet-base'

import Logger from '@uncover/js-utils-logger'

const LOGGER = new Logger('REST-ACCOUNTS')

export const postAccount = function(req, res, next) {
  defaultPost(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const getAccount = function(req, res, next) {
  defaultGet(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const putAccount = function(req, res, next) {
  defaultPut(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const patchAccount = function(req, res, next) {
  defaultPut(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const deleteAccount = function(req, res, next) {
  defaultDelete(SCHEMAS.ACCOUNTS, req, res, next, null)
}

const addRoutes = (app) => {
  app.post('/rest/accounts/', postAccount)
  app.get('/rest/accounts/:accountId', getAccount)
  app.put('/rest/accounts/:accountId', putAccount)
  app.patch('/rest/accounts/:accountId', patchAccount)
  app.delete('/rest/accounts/:accountId', deleteAccount)
}

export default addRoutes
