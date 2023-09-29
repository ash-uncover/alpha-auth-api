import { Logger } from '@uncover/js-utils-logger'

const LOGGER = new Logger('useDebugRequest')

export const useDebugRequest = function (req: any, res: any, next: any) {
  LOGGER.info(`${req.method} ${req.url}`)
  if (req.body) {
    LOGGER.debug(JSON.stringify(req.body))
  }
  next()
}