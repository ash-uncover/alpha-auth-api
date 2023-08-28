import express, {
  Request,
  Response
} from 'express'

import Logger from '@uncover/js-utils-logger'

import {
  HttpUtils,
} from '@uncover/js-utils'

import { healthRouter } from './servlets/health'

import { authRouterV1 } from './servlets/auth.v1'
import { accountsRouterV1 } from './servlets/accounts.v1'
import { usersRouterV1 } from './servlets/users.v1'

import {
  useAuth,
  useDebugRequest,
  useHeaders
} from './middleware'
import CONFIG from '../configuration'

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

app.use(`${CONFIG.ALPHA_AUTH_REST_ROOT}/health`, healthRouter)

app.use(useAuth)

app.use(`${CONFIG.ALPHA_AUTH_REST_ROOT}/v1/auth`, authRouterV1)
app.use(`${CONFIG.ALPHA_AUTH_REST_ROOT}/v1//accounts`, accountsRouterV1)
app.use(`${CONFIG.ALPHA_AUTH_REST_ROOT}/v1//users`, usersRouterV1)

export default app
