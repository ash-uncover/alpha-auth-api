import { HttpUtils } from '@uncover/js-utils'
import Logger from '@uncover/js-utils-logger'

const LOGGER = new Logger('useNotFound')

export const useNotFound = function (req: any, res: any, next: any) {
  res.status(HttpUtils.HttpStatus.NOT_FOUND).send('<h1>NOT FOUND</h1>')
}