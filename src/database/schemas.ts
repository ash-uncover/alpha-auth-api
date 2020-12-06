import * as mongoose from 'mongoose'
import { UUID } from '@uncover/js-utils'

// Common stuf
const SchemaBase = {
  id: { type: String, required: true },
  _creationDate: { type: Date },
  _lastUpdateDate: { type: Date }
}
interface DocumentBase extends mongoose.Document {
  id: string,
  _creationDate:  Date,
  _lastUpdateDate: Date
}

export const RESERVED_FIELDS = [
  '_id',
  '_creationDate',
  '_lastUpdateDate',
  '_deleted',
  '__v',
  'id',
]

export const removeReserved = (data) => {
  RESERVED_FIELDS.forEach((field) => {
    delete data[field]
  })
  return data
}

export const removePrivate = (data) => {
  ['_id', '__v', '_deleted'].forEach((field) => {
    delete data[field]
  })
  return data
}

const preSave = function (next) {
  let now = new Date()
  this.id || (this.id = UUID.next())
  this._creationDate || (this._creationDate = now)
  this._lastUpdateDate = now
  next()
}

// Accounts collection
export const accountsSchema = new mongoose.Schema(Object.assign({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
}, SchemaBase))
accountsSchema.pre('save', preSave)
export const accounts = mongoose.model('accounts', accountsSchema)

// Users collection
export const usersSchema = new mongoose.Schema(Object.assign({
  name: { type: String, required: true },
  avatar: { type: String },
  description: { type: String },
}, SchemaBase))
usersSchema.pre('save', preSave)
export const users = mongoose.model('users', usersSchema)

// Relations collection
export interface IRelation extends DocumentBase {
  userId: string,
  relationId: string,
  status: string
}
export const RelationSchema = new mongoose.Schema(Object.assign({
  userId: { type: String, required: true },
  relationId: { type: String, required: true },
  status: { type: String, required: true },
}, SchemaBase))
RelationSchema.pre('save', preSave)
export const relations = mongoose.model<IRelation>('relations', RelationSchema)

// Threads collection
export const threadsSchema = new mongoose.Schema(Object.assign({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: [String] },
}, SchemaBase))
threadsSchema.pre('save', preSave)
export const threads = mongoose.model('threads', threadsSchema)

// Messages collection
export const messagesSchema = new mongoose.Schema(Object.assign({
  threadId: { type: String },
  userId: { type: String },
  text: { type: String },
  date: { type: Date },
  readBy: { type: [String] },
}, SchemaBase))
messagesSchema.pre('save', preSave)
export const messages = mongoose.model('messages', messagesSchema)


const SCHEMAS = {
  ACCOUNTS: {
    model: accounts,
    name: 'account',
    collection: 'accounts',
  },
  USERS: {
    model: users,
    name: 'user',
    collection: 'users',
  },
  RELATIONS: {
    model: relations,
    name: 'relation',
    collection: 'relations',
  },
  THREADS: {
    model: threads,
    name: 'thread',
    collection: 'threads',
  },
  MESSAGES: {
    model: messages,
    name: 'message',
    collection: 'messages',
  },
}
export default SCHEMAS
