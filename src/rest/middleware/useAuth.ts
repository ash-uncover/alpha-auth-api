import { EncodeUtils, HttpUtils } from '@uncover/js-utils'
import Logger from '@uncover/js-utils-logger'
import { AccountModel } from '../../database/schemas'

const LOGGER = new Logger('useAuth')

export const useAuth = function (req: any, res: any, next: any) {
  LOGGER.debug('useAuth')
  const account = EncodeUtils.decodeBasicHeader(req.headers.authorization)
  AccountModel.findOne(account).select('-_id -__v').exec()
    .then((data: any) => {
      if (data) {
        req.__context = data
        next()
      } else {
        res.status(HttpUtils.HttpStatus.UNAUTHORIZED).send()
      }
    })
    .catch((err: any) => {
      res.status(HttpUtils.HttpStatus.ERROR).send(err)
    })
}
