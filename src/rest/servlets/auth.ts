import * as nodemailer from 'nodemailer'

import SCHEMAS, {
  removeReserved
} from '../../database/schemas'

import {
  HttpUtils,
} from '@uncover/js-utils'

import {
  v4 as uuidv4
} from 'uuid'

import {
  nextToken
} from '../../lib/TokenGenerator'

import AccountStatus from '../../lib/AccountStatus'

import CONFIG from '../../configuration'

import Logger from '@uncover/js-utils-logger'
import ERRORS, { sendError } from '../servlet-error'
const LOGGER = new Logger('REST-AUTH')

export const getAuth = (req: any, res: any, next: any) => {
  res.status(HttpUtils.HttpStatus.OK).send({ userId: req.__context.userId })
}

export const deleteAuth = (req: any, res: any, next: any) => {
  res.status(HttpUtils.HttpStatus.OK).send()
}

export const postAuthRegister = async (req, res, next) => {
  try {
    const {
      username,
      password
    } = req.body
    // check if account can be created
    const prevAccount = await SCHEMAS.ACCOUNTS.model.findOne({ username })
    let accountData = prevAccount
    if (prevAccount) {
      if (prevAccount.status !== AccountStatus.REGISTERING) {
        sendError(LOGGER, res, ERRORS.AUTH_REGISTER_ACCOUNT_EXISTS)
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
      accountData.status = AccountStatus.REGISTERING
    }
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
      from: 'auth-service@alpha.com',
      to: username,
      subject: 'Alpha Account Creation',
      html: `<p>Enter the following code</p><h1>${accountData.actionToken}</h1><p>Best Regards</p>`
    }
    transport.sendMail(message, (err, info) => {
      if (err) {
        LOGGER.error(err)
        sendError(LOGGER, res, ERRORS.AUTH_REGISTER_MAIL_ERROR)
      } else {
        console.log(info);
        res.status(HttpUtils.HttpStatus.CREATED).send()
      }
    })
  } catch (error) {
    sendError(LOGGER, res, ERRORS.INTERNAL)
  }
}

export const putAuthRegister = async (req, res, next) => {
  try {
    const {
      username,
      token
    } = req.body
    // check if account can be created
    const account = await SCHEMAS.ACCOUNTS.model.findOne({ username })
    if (!account) {
      sendError(LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_ACCOUNT_INVALID)
    } else if (account.status !== AccountStatus.REGISTERING) {
      sendError(LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_ACCOUNT_EXISTS)
    } else if (account.actionToken !== token) {
      sendError(LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_TOKEN_INVALID)
    } else if (!account.actionDate || ((new Date().getTime() - account.actionDate.getTime()) > 3600000)) {
      sendError(LOGGER, res, ERRORS.AUTH_REGISTER_CONFIRM_TOKEN_EXPIRED)
    } else {
      account.status = AccountStatus.ACTIVE
      account.actionToken = null
      account.actionDate = null
      await account.save()
      res.status(HttpUtils.HttpStatus.OK).send()
    }
  } catch (error) {
    sendError(LOGGER, res, ERRORS.INTERNAL)
  }
}
