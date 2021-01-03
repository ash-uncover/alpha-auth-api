import { buildSchema } from 'graphql'

const schemaString = `
  type Query {
    viewer: User
    user(id: ID!): User
  }
  type User {
    id: ID!
    name: String!
    avatar: String
    description: String
    relations: [Relation!]!
    threads: [Thread!]!
  }
  type Relation {
    id: ID!
    status: String!
    user: User!
  }
  type Thread {
    id: ID!
    name: String!
    type: String!
    users: [User!]!
    messages: [Message!]!
  }
  type Message {
    id: ID!
    thread: Thread!
    user: User!
    text: String!
    messages: [Message!]!
  }
`

export default buildSchema(schemaString)
