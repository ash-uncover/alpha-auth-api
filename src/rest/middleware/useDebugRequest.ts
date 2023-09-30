import { REST_LOGGER } from '../logger'

export const useDebugRequest = function (req: any, res: any, next: any) {
  REST_LOGGER.info(`${req.method} ${req.url}`)
  if (req.body) {
    REST_LOGGER.debug(JSON.stringify(req.body))
  }
  next()
}