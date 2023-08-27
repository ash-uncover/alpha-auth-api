import express from 'express'

import Logger from '@uncover/js-utils-logger'

import {
  HttpUtils,
  EncodeUtils,
} from '@uncover/js-utils'

import { authRouter } from './servlets/auth'
import { accountRouter } from './servlets/accounts'

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

app.use(useAuth)

app.use('/auth', authRouter)
app.use('/accounts', accountRouter)
addUsersRoutes(app)

export default app
