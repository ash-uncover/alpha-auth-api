import mongoose from 'mongoose'
import request from 'supertest'

import { HttpUtils } from '@uncover/js-utils'

import app from '../../../src/rest'
import SCHEMAS from '../../../src/database/schemas'
import { CONFIG } from '../../../src/config'

import {
  resetDatabase,
  ACCOUNT_1,
  AUTH_TOKEN_1,
  USER_1,
  MONGO_CONNECTION,
  AUTH_TOKEN_2
} from '../test.data'

describe('/users', () => {

  const URL_USERS_V1 = `${CONFIG.ALPHA_AUTH_REST_ROOT}/v1/users`

  beforeAll(async () => {
    try {
      await mongoose.connect(MONGO_CONNECTION, {
        bufferCommands: false
      })
    } catch (error) {
      console.error('Failed to connect mongo')
    }
  })

  beforeEach(async () => {
    await resetDatabase()
    await Promise.all([
      SCHEMAS.ACCOUNTS.model.create(ACCOUNT_1),
      SCHEMAS.USERS.model.create(USER_1)
    ])
  })

  afterAll(async () => {
    try {
      return await mongoose.disconnect()
    } catch (error) {
      console.error('Failed to disconnect from mongo')
    }
  })

  describe('/', () => {

    describe('/:userId', () => {

      describe('GET', () => {

        test('When no token is provided', () => {
          return request(app)
            .get(`${URL_USERS_V1}/${USER_1.id}`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })

        test('When accessing a user that does not exist', () => {
          return request(app)
            .get(`${URL_USERS_V1}/dummy`)
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
            .get(`${URL_USERS_V1}/${USER_1.id}`)
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
            .patch(`${URL_USERS_V1}/${USER_1.id}`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })

        test('When accessing a user that does not exist', () => {
          return request(app)
            .patch(`${URL_USERS_V1}/dummy`)
            .set({ Authorization: AUTH_TOKEN_1 })
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.NOT_FOUND)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })
      describe('/avatar', () => {

        describe('POST', () => {

          test('When not authentified', () => {
            return request(app)
              .post(`${URL_USERS_V1}/${USER_1.id}/avatar`)
              .then(response => {
                expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
              })
              .catch((error) => {
                expect(error).toBe(null)
              })
          })

          test('When not authentified with the correct user', () => {
            return request(app)
              .post(`${URL_USERS_V1}/${USER_1.id}/avatar`)
              .set({ Authorization: AUTH_TOKEN_2 })
              .then(response => {
                expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
              })
              .catch((error) => {
                expect(error).toBe(null)
              })
          })

          test('When no data is sent', () => {
            return request(app)
              .post(`${URL_USERS_V1}/${USER_1.id}/avatar`)
              .set({ Authorization: AUTH_TOKEN_1 })
              .then(response => {
                expect(response.statusCode).toBe(HttpUtils.HttpStatus.BAD_REQUEST)
              })
              .catch((error) => {
                expect(error).toBe(null)
              })
          })

          test('When updating the correct avatar', () => {
            return request(app)
              .post(`${URL_USERS_V1}/${USER_1.id}/avatar`)
              .set({ Authorization: AUTH_TOKEN_1 })
              .attach('avatar', 'test/data/jin-lol.png')
              .then(response => {
                expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
              })
              .catch((error) => {
                expect(error).toBe(null)
              })
          })
        })
      })
    })
  })
})
