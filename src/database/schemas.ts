import * as mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

// Common stuf


export const INTERNAL_FIELDS = [
  '_id',
  '_creationDate',
  '_lastUpdateDate',
  '_deleted',
  '__v',
]
export const RESERVED_FIELDS = [
  ...INTERNAL_FIELDS,
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

interface DocumentBase {
  id: string,
  _creationDate?: Date,
  _lastUpdateDate?: Date
}

const SchemaBase = {
  id: { type: String, required: true },
  _creationDate: { type: Date },
  _lastUpdateDate: { type: Date }
}

// Accounts collection

export interface IAccount extends DocumentBase {
  username: string,
  password: string,
  type: string,
  userId: string,
  status: string,
  actionToken?: string,
  actionDate?: Date,
}

export const AccountSchema = new mongoose.Schema({
  ...SchemaBase,
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  userId: { type: String, required: true },
  status: { type: String, required: true },
  actionToken: { type: String },
  actionDate: { type: Date },
})
AccountSchema.pre('save', preSave)

export const AccountName = 'account'
export const AccountCollectionName = `${AccountName}s`
export const createAccountModel = () => mongoose.model<IAccount>(AccountCollectionName, AccountSchema)
export const AccountModel = createAccountModel()


// Users collection
export interface IUser extends DocumentBase {
  name: string,
  avatar?: string,
  description: string,
}

export const UserSchema = new mongoose.Schema({
  ...SchemaBase,
  name: { type: String, required: true },
  avatar: { type: String },
  description: { type: String },
})
UserSchema.pre('save', preSave)

export const UserName = 'user'
export const UserCollectionName = `${UserName}s`
export const createUserModel = () => mongoose.model<IUser>(UserCollectionName, UserSchema)
export const UserModel = createUserModel()

const SCHEMAS = {
  ACCOUNTS: {
    model: AccountModel,
    name: AccountName,
    collection: AccountCollectionName,
  },
  USERS: {
    model: UserModel,
    name: UserName,
    collection: UserCollectionName,
  },
}

export default SCHEMAS
