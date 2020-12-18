import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// Common stuf
export const SchemaBase = {
  id: { type: String, required: true },
  _creationDate: { type: Date },
  _lastUpdateDate: { type: Date }
}
export interface DocumentBase extends mongoose.Document {
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

export const preSave = function (next) {
  let now = new Date()
  this.id || (this.id = uuidv4())
  this._creationDate || (this._creationDate = now)
  this._lastUpdateDate = now
  next()
}

// Accounts collection
export const AccountName = 'account'
export const AccountCollection = `${AccountName}s`
export interface IAccount extends DocumentBase {
  username: string,
  password: string,
  type: string,
  userId: string,
  status: string,
  actionToken: string,
  actionDate: Date,
}
export const AccountSchema = new mongoose.Schema(Object.assign({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
  actionToken: { type: String },
  actionDate: { type: Date },
}, SchemaBase))
AccountSchema.pre('save', preSave)
export const AccountModel = mongoose.model<IAccount>(AccountCollection, AccountSchema)


// Users collection
export const UserName = 'user'
export const UserCollection = `${UserName}s`
export interface IUser extends DocumentBase {
  name: string,
  avatar: string,
  description: string,
}
export const UserSchema = new mongoose.Schema(Object.assign({
  name: { type: String, required: true },
  avatar: { type: String },
  description: { type: String },
}, SchemaBase))
UserSchema.pre('save', preSave)
export const UserModel = mongoose.model<IUser>(UserCollection, UserSchema)


// Relations collection
export const RelationName = 'relation'
export const RelationCollection = `${RelationName}s`
export interface IRelation extends DocumentBase {
  userId: string,
  relationId: string,
  status: string,
}
export const RelationSchema = new mongoose.Schema(Object.assign({
  userId: { type: String, required: true },
  relationId: { type: String, required: true },
  status: { type: String, required: true },
}, SchemaBase))
RelationSchema.pre('save', preSave)
export const RelationModel = mongoose.model<IRelation>(RelationCollection, RelationSchema)


// Threads collection
export const ThreadName = 'thread'
export const ThreadCollection = `${ThreadName}s`
export interface IThread extends DocumentBase {
  name: string,
  type: string,
  userId: string[],
}
export const ThreadSchema = new mongoose.Schema(Object.assign({
  name: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: [String] },
}, SchemaBase))
ThreadSchema.pre('save', preSave)
export const ThreadModel = mongoose.model(ThreadCollection, ThreadSchema)

// Messages collection
export const MessageName = 'message'
export const MessageCollection = `${MessageName}s`
export interface IMessage extends DocumentBase {
  threadId: string,
  userId: string,
  text: string,
  date: Date,
  readBy: string[],
}
export const MessageSchema = new mongoose.Schema(Object.assign({
  threadId: { type: String },
  userId: { type: String },
  text: { type: String },
  date: { type: Date },
  readBy: { type: [String] },
}, SchemaBase))
MessageSchema.pre('save', preSave)
export const MessageModel = mongoose.model(MessageCollection, MessageSchema)


const SCHEMAS = {
  ACCOUNTS: {
    model: AccountModel,
    name: AccountName,
    collection: AccountCollection,
  },
  USERS: {
    model: UserModel,
    name: UserName,
    collection: UserCollection,
  },
  RELATIONS: {
    model: RelationModel,
    name: RelationName,
    collection: RelationCollection,
  },
  THREADS: {
    model: ThreadModel,
    name: ThreadName,
    collection: ThreadCollection,
  },
  MESSAGES: {
    model: MessageModel,
    name: MessageName,
    collection: MessageCollection,
  },
}

export default SCHEMAS
