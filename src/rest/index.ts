import express from 'express'

import Logger from '@uncover/js-utils-logger'

import {
  AccountModel
} from '../database/schemas'

import {
  HttpUtils,
  EncodeUtils,
} from '@uncover/js-utils'

import {
  getAuth,
  deleteAuth,
  postAuthRegister,
  putAuthRegister,
} from './servlets/auth'

import addUsersRoutes from './servlets/users'

import {
  useAuth,
  useDebugRequest,
  useHeaders
} from './middleware'

const LOGGER = new Logger('REST')

export const optionsRoute = (req: any, res: any, next: any) => {
  LOGGER.debug('optionsRoute')
  res.sendStatus(HttpUtils.HttpStatus.OK)
}

const app = express()

app.use(express.static('public'))

app.use(useHeaders)

app.options('*', optionsRoute)

app.use(useDebugRequest)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/auth/register', postAuthRegister)
app.put('/auth/register', putAuthRegister)

app.use(useAuth)

// Auth end point
app.get('/auth', getAuth)
app.delete('/auth', deleteAuth)

addUsersRoutes(app)

export default app
