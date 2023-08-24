import mongoose from 'mongoose'
import request from 'supertest'

import { LogConfig } from '@uncover/js-utils-logger'
import { HttpUtils } from '@uncover/js-utils'

import app from '../../../src/rest'
import SCHEMAS from '../../../src/database/schemas'
import CONFIG from '../../../src/configuration'

import {
  resetDatabase,
  ACCOUNT_1,
  AUTH_TOKEN_1,
  USER_1
} from '../test.data'

describe('/users', () => {

  beforeAll(async () => {
    try {
      await mongoose.connect(CONFIG.ALPHA_AUTH_DATABASE_CONN, {
        bufferCommands: false
      })
    } catch (error) {
      console.error('Failed to connect mongo')
    }
  })

  beforeEach(async () => {
    await resetDatabase()
    await SCHEMAS.ACCOUNTS.model.create(ACCOUNT_1)
    await SCHEMAS.USERS.model.create(USER_1)
  })

  afterAll(async () => {
    try {
      await mongoose.disconnect()
    } catch (error) {
      console.error('Failed to disconnect from mongo')
    }
  })

  describe('/:userId', () => {

    describe('GET ALL', () => {

      test('', () => {
      })
    })

    describe('GET', () => {

      test('When no token is provided', () => {
        return request(app)
          .get(`/rest/users/${USER_1.id}`)
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })

      test('When accessing a user that does not exist', () => {
        return request(app)
          .get('/rest/users/dummy')
          .set({ Authorization: AUTH_TOKEN_1 })
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.NOT_FOUND)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })

      test('When a valid token is provided', () => {
        return request(app)
          .get(`/rest/users/${USER_1.id}`)
          .set({ Authorization: AUTH_TOKEN_1 })
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })
    })

    describe('PATCH', () => {

      test('When no token is provided', () => {
        return request(app)
          .patch(`/rest/users/${USER_1.id}`)
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })

      test('When accessing a user that does not exist', () => {
        return request(app)
          .patch('/rest/users/dummy')
          .set({ Authorization: AUTH_TOKEN_1 })
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.NOT_FOUND)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })
    })

    describe('DELETE', () => {

      test('When no token is provided', () => {
        return request(app)
          .delete(`/rest/users/${USER_1.id}`)
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })

      test('When accessing a user that does not exist', () => {
        return request(app)
          .delete('/rest/users/dummy')
          .set({ Authorization: AUTH_TOKEN_1 })
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.NOT_FOUND)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })

      test('When deleting an existing user', () => {
        return request(app)
        .delete(`/rest/users/${USER_1.id}`)
          .set({ Authorization: AUTH_TOKEN_1 })
          .then(response => {
            expect(response.statusCode).toBe(HttpUtils.HttpStatus.REMOVED)
          })
          .catch((error) => {
            expect(error).toBe(null)
          })
      })
    })
  })
})
