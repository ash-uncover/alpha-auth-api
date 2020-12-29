import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'

export const schema =  buildSchema(`
  type Query {
    hello: String
  }
`)

const root = {
  hello: () => {
    return 'Hello world!'
  }
}

export default graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
})
