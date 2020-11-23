import * as mongoose from 'mongoose'
import Logger from '@uncover/js-utils-logger'

import CONFIG from '../configuration'

const LOGGER = new Logger('Mongo Connection')

let urlmongo = CONFIG.ALPHA_AUTH_DATABASE_CONN

const connection = {
  open: (callback) => {
    mongoose.connect(urlmongo, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const db = mongoose.connection

    db.on('error', () => {
      LOGGER.error(`Failed to connect to database "${urlmongo}"`)
    })

    db.once('open', () => {
      LOGGER.info(`Connected to database "${urlmongo}"`)
      callback && callback()
    })

    return db
  }
}

export default connection