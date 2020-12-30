import { buildSchema } from 'graphql'

const schemaString = `
type Query {
  user: User,
},
type User {
  name: String,
  avatar: String,
  description: String,
  relations: [Relation!]!,
}
type Relation {
  user: User,
  status: String
}
`

export default buildSchema(schemaString)
