import connection from './database/connection'
import rest from './rest'

import Logger, {
  LogConfig
} from '@uncover/js-utils-logger'

LogConfig.info()

const LOGGER = new Logger('SERVER')

/*
const express = require('express')
const graphqlHTTP = require('express-graphql')

const mongo = require('mongoose')
const app = express()

mongo.connect('mongodb://***yourusername***:***yourpassword***@ds053317.mlab.com:53317/gql-demo', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

mongo.connection.once('open', () => {
  console.log('connected to database')
})

app.use(
  '/graphiql',
  graphqlHTTP({
    schema: require('./schema.js'),
    graphiql: true
  })
)

app.listen(8080, () => {
  console.log('Server running succefully...')
})
*/

const PORT_REST = 8090

connection.open(() => {
  const server = rest.listen(PORT_REST, () => {
    LOGGER.info(`REST is running in http://localhost:${PORT_REST}`)
  })
  server.on('close', () => {
    LOGGER.debug('REST Shutting down')
  })
})
