import * as mongoose from 'mongoose'
import { UUID } from '@uncover/js-utils'

// Common stuf
const defaultSchema = {
  id: { type: String },
  _creationDate: { type: Date },
  _lastUpdateDate: { type: Date }
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
}, defaultSchema))
accountsSchema.pre('save', preSave)
export const accounts = mongoose.model('accounts', accountsSchema)

// Users collection
export const usersSchema = new mongoose.Schema(Object.assign({
  name: { type: String, required: true },
  description: { type: String },
  relations: [{ userId: String, status: String }],
}, defaultSchema))
usersSchema.methods.getPublicFields = function () {
  console.log(this)
  this.select('-_id -__v')
}
usersSchema.pre('save', preSave)
export const users = mongoose.model('users', usersSchema)

// Threads collection
export const threadsSchema = new mongoose.Schema(Object.assign({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: [String] },
}, defaultSchema))
threadsSchema.pre('save', preSave)
export const threads = mongoose.model('threads', threadsSchema)

// Messages collection
export const messagesSchema = new mongoose.Schema(Object.assign({
  threadId: { type: String },
  userId: { type: String },
  text: { type: String },
  date: { type: Date },
  readBy: { type: [String] },
}, defaultSchema))
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