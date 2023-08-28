import mongoose from 'mongoose'
import request from 'supertest'

import { HttpUtils } from '@uncover/js-utils'

import app from '../../../src/rest'
import SCHEMAS from '../../../src/database/schemas'
import CONFIG from '../../../src/configuration'

import {
  resetDatabase,
  ACCOUNT_1,
  AUTH_TOKEN_1,
  USER_1,
  MONGO_CONNECTION
} from '../test.data'

describe('/accounts', () => {

  const URL_ACCOUNTS_V1 = `${CONFIG.ALPHA_AUTH_REST_ROOT}/v1/accounts`

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
    await SCHEMAS.ACCOUNTS.model.create(ACCOUNT_1)
    return await SCHEMAS.USERS.model.create(USER_1)
  })

  afterAll(async () => {
    try {
      return await mongoose.disconnect()
    } catch (error) {
      console.error('Failed to disconnect from mongo')
    }
  })

  describe('/', () => {

    describe('/register', () => {

      describe('POST', () => {

        test('', () => {
          return request(app)
            .post(`${URL_ACCOUNTS_V1}/register`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })

      describe('PUT', () => {

        test('', () => {
          return request(app)
            .put(`${URL_ACCOUNTS_V1}/register`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })
    })

    describe('/recover', () => {

      describe('POST', () => {

        test('', () => {
          return request(app)
            .post(`${URL_ACCOUNTS_V1}/recover`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })

      describe('PUT', () => {

        test('', () => {
          return request(app)
            .put(`${URL_ACCOUNTS_V1}/recover`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })
    })

    describe('/changemail', () => {

      describe('POST', () => {

        test('', () => {
          return request(app)
            .post(`${URL_ACCOUNTS_V1}/changemail`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })

      describe('PUT', () => {

        test('', () => {
          return request(app)
            .put(`${URL_ACCOUNTS_V1}/changemail`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })
    })

    describe('/{accountId}', () => {

      describe('GET', () => {

        test('', () => {
          return request(app)
            .get(`${URL_ACCOUNTS_V1}/dummy`)
            .then(response => {
              expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
            })
            .catch((error) => {
              expect(error).toBe(null)
            })
        })
      })

      describe('PATCH', () => {

        test('', () => {
          return request(app)
            .patch(`${URL_ACCOUNTS_V1}/dummy`)
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
