import { graphqlHTTP } from 'express-graphql'

import schema from './schema'
import * as rootValue from './resolvers'

export default graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
})
