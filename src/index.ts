import CONFIG from './configuration'

import * as mongoose from 'mongoose'
import rest from './rest'

import Logger, {
  LogConfig
} from '@uncover/js-utils-logger'

LogConfig.info()
const LOGGER = new Logger('SERVER')

mongoose.connect(CONFIG.ALPHA_AUTH_DATABASE_CONN)
  .then(() => {
    LOGGER.error('Database is running')
    const server = rest.listen(CONFIG.ALPHA_AUTH_REST_PORT, () => {
      LOGGER.info(`Server is running in ${CONFIG.ALPHA_AUTH_REST_PROTOCOL}://${CONFIG.ALPHA_AUTH_REST_HOST}:${CONFIG.ALPHA_AUTH_REST_PORT}`)
    })
    server.on('close', () => {
      LOGGER.debug('Server Shutting down')
      mongoose.connection.close()
    })
  })
  .catch((error) => {
    LOGGER.error('Failed to connect Mongo')
    LOGGER.error(error)
  })
