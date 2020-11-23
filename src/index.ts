import CONFIG from './configuration'
import connection from './database/connection'
import rest from './rest'

import Logger, {
  LogConfig
} from '@uncover/js-utils-logger'

LogConfig.info()
const LOGGER = new Logger('SERVER')

connection.open(() => {
  const server = rest.listen(CONFIG.ALPHA_AUTH_REST_PORT, () => {
    LOGGER.info(`REST is running in ${CONFIG.ALPHA_AUTH_REST_PROTOCOL}://${CONFIG.ALPHA_AUTH_REST_HOST}:${CONFIG.ALPHA_AUTH_REST_PORT}`)
  })
  server.on('close', () => {
    LOGGER.debug('REST Shutting down')
  })
})
