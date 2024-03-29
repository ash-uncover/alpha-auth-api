import {
  Router,
  Response
} from 'express'

import {
  defaultPost,
  defaultGet,
  defaultPut,
  defaultDelete,
  AuthRequest,
} from '../servlet-base'

import SCHEMAS, {
  IAccount,
  removeReserved
} from '../../database/schemas'


import { v4 as uuidv4 } from 'uuid'
import * as nodemailer from 'nodemailer'

import {
  AccountStatus,
  AccountStatuses
} from '../../lib/AccountStatus'

import { HttpUtils } from '@uncover/js-utils'

import ERRORS, { sendError } from '../servlet-error'
import { nextToken } from '../../lib/TokenGenerator'
import { CONFIG } from '../../config'
import { AccountTokenRecover, AccountTokenRegister, Credentials, CredentialsUsername } from 'alpha-auth-common/build/services/auth/auth.model'
import { REST_LOGGER } from '../logger'
import { useAuth } from '../middleware'

// Create router

export const accountsRouterV1 = Router()

// POST /register

export const postAccountRegister = async (
  req: AuthRequest<{}, {}, Credentials>,
  res: Response,
  next: () => void
) => {
  try {
    const {
      username,
      password
    } = req.body
    // check if account can be created
    const prevAccount: IAccount = await SCHEMAS.ACCOUNTS.model.findOne({ username })
    let accountData = prevAccount
    if (prevAccount) {
      if (prevAccount.status !== AccountStatuses.REGISTERING) {
        sendError(REST_LOGGER, res, ERRORS.AUTH_REGISTER_ACCOUNT_EXISTS)
        return
      }
    } else {
      // create user
      const userData = {
        id: uuidv4(),
        name: username
      }
      const user = new SCHEMAS.USERS.model(userData)
      await user.save()
      // create temporary account
      accountData = removeReserved(req.body)
      accountData.id = uuidv4()
      accountData.type = 'ALPHA'
      accountData.userId = user.id
      accountData.status = AccountStatuses.REGISTERING
    }
    accountData.password = password
    accountData.actionToken = nextToken()
    accountData.actionDate = new Date()
    const account = new SCHEMAS.ACCOUNTS.model(accountData)
    await account.save()
    // Send a mail with the code
    const transport = nodemailer.createTransport({
      host: CONFIG.ALPHA_AUTH_SMTP_HOST,
      port: Number(CONFIG.ALPHA_AUTH_SMTP_PORT),
      auth: {
        user: CONFIG.ALPHA_AUTH_SMTP_USER,
        pass: CONFIG.ALPHA_AUTH_SMTP_PASS
      }
    })
    const message = {
      from: 'auth-service@do-not-reply.alpha.com',
      to: username,
      subject: 'Alpha Account Creation',
      html: `<p>Enter the following code</p><h1>${accountData.actionToken}</h1><p>Best Regards</p>`
    }
    transport.sendMail(message, (err, info) => {
      if (err) {
        REST_LOGGER.error(err)
        sendError(REST_LOGGER, res, ERRORS.AUTH_REGISTER_MAIL_ERROR)
      } else {
        res.status(HttpUtils.HttpStatus.CREATED).send()
      }
    })
  } catch (error) {
    sendError(REST_LOGGER, res, ERRORS.INTERNAL)
  }
}
accountsRouterV1.post('/register', postAccountRegister)

// PUT /register

export const putAccountRegister = async (
  req: AuthRequest<{}, {}, AccountTokenRegister>,
  res: Response,
  next: () => void
) => {
  try {
    const {
      username,
      token
    } = req.body
    // check if account can be created
    const account = await SCHEMAS.ACCOUNTS.model.findOne({ username })
    if (!account) {
      sendError(REST_LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_ACCOUNT_INVALID)
    } else if (account.status !== AccountStatuses.REGISTERING) {
      sendError(REST_LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_ACCOUNT_EXISTS)
    } else if (account.actionToken !== token) {
      sendError(REST_LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_TOKEN_INVALID)
    } else if (!account.actionDate || ((new Date().getTime() - account.actionDate.getTime()) > 3600000)) {
      sendError(REST_LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_TOKEN_EXPIRED)
    } else {
      account.status = AccountStatuses.ACTIVE
      account.actionToken = null
      account.actionDate = null
      await account.save()
      res.status(HttpUtils.HttpStatus.OK).send()
    }
  } catch (error) {
    sendError(REST_LOGGER, res, ERRORS.INTERNAL)
  }
}
accountsRouterV1.put('/register', putAccountRegister)


// POST /recover

export const postAccountRecover = async (
  req: AuthRequest<{}, {}, CredentialsUsername>,
  res: Response,
  next: () => void
) => {
}
accountsRouterV1.post('/recover', postAccountRecover)


// PUT /recover

export const putAccountRecover = async (
  req: AuthRequest<{}, {}, AccountTokenRecover>,
  res: Response,
  next: () => void
) => {
}
accountsRouterV1.put('/recover', putAccountRecover)


// POST /changemail

export const postAccountChangeMail = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
}
accountsRouterV1.post('/changemail', postAccountChangeMail)


// PUT /changemail

export const putAccountChangeMail = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
}
accountsRouterV1.put('/changemail', putAccountChangeMail)


// GET /:accountId

export const getAccount = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
}
accountsRouterV1.get('/:accountId', useAuth, getAccount)


// PATCH /:accountId

export const patchAccount = async (
  req: AuthRequest<{}, {}, {}>,
  res: Response,
  next: () => void
) => {
}
accountsRouterV1.patch('/:accountId', useAuth, patchAccount)
