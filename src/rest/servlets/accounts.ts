import SCHEMAS, {
  removeReserved
} from '../../database/schemas'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
} from '../servlet-base'

import { v4 as uuidv4 } from 'uuid'
import AccountStatus from '../../lib/AccountStatus'

import Logger from '@uncover/js-utils-logger'

const LOGGER = new Logger('REST-ACCOUNTS')

export const postAccount = async (req, res, next) => {
  // check if account can be created

  // create user
  const user = new SCHEMAS.USERS.model()
  await user.save()
  // create temporary account
  const accountData = removeReserved(req.body)
  accountData.type = 'AP'
  accountData.userId = user.id
  accountData.status = AccountStatus.REGISTERING
  accountData.actionToken = uuidv4()
  const account = new SCHEMAS.ACCOUNTS.model()
  await account.save()
  defaultPost(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const getAccount = (req, res, next) => {
  defaultGet(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const putAccount = (req, res, next) => {
  defaultPut(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const patchAccount = (req, res, next) => {
  defaultPut(SCHEMAS.ACCOUNTS, req, res, next, null)
}

export const deleteAccount = (req, res, next) => {
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
