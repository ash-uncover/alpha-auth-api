import { CONFIG } from './config'

import * as mongoose from 'mongoose'
import { app } from './rest'

import {
  Logger,
  LogLevels
} from '@uncover/js-utils-logger'

const LOGGER = new Logger('SERVER', LogLevels.INFO)

mongoose.connect(CONFIG. ALPHA_AUTH_DATABASE_CONN)
  .then(() => {
    LOGGER.info('Connected to Database')
    const server = app.listen(CONFIG.ALPHA_AUTH_REST_PORT, () => {
      LOGGER.info(`Server is running in ${CONFIG.ALPHA_AUTH_REST_PROTOCOL}://${CONFIG.ALPHA_AUTH_REST_HOST}:${CONFIG.ALPHA_AUTH_REST_PORT}`)
    })
    server.on('close', () => {
      LOGGER.debug('Server Shutting down')
      mongoose.connection.close()
    })
  })
  .catch((error) => {
    LOGGER.error('Failed to connect to Database')
    LOGGER.error(error)
  })
