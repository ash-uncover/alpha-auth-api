/*
@startuml

skinparam componentStyle rectangle

[account1]
[account2]

[user1] -up-> [account1]

@enduml
*/

import mongoose from "mongoose";
import SCHEMAS, {
  IAccount,
  IUser,
} from "../../src/database/schemas";

export const AUTH_TOKEN_1 = 'Basic YTph'
export const ACCOUNT_1: IAccount = {
  id: 'account1',
  username: 'a',
  password: 'a',
  userId: 'user1',
  type: 'AP',
  status: 'ACTIVE',
}

export const AUTH_TOKEN_2 = 'Basic Yjpi'
export const ACCOUNT_2: IAccount = {
  id: 'account2',
  username: 'b',
  password: 'b',
  userId: 'user2',
  type: 'AP',
  status: 'ACTIVE',
}

export const USER_1: IUser = {
  id: 'user1',
  description: 'User One description',
  name: 'User One'
}

export const resetDatabase = async () => {
  try {
    await mongoose.connection.dropCollection(SCHEMAS.ACCOUNTS.collection)
    SCHEMAS.ACCOUNTS.model.createCollection()
  } catch (error) {
    console.error('error while deleting ACCOUNT collection')
    console.error(error)
  }
  try {
    await mongoose.connection.dropCollection(SCHEMAS.USERS.collection)
    SCHEMAS.USERS.model.createCollection()
  } catch (error) {
    console.error('error while deleting USER collection')
    console.error(error)
  }
}