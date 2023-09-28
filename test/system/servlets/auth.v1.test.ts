import mongoose from 'mongoose'
import request from 'supertest'

import { LogConfig } from '@uncover/js-utils-logger'
import { HttpUtils } from '@uncover/js-utils'

import app from '../../../src/rest'
import SCHEMAS from '../../../src/database/schemas'
import { CONFIG } from '../../../src/config'

import {
  resetDatabase,
  ACCOUNT_1,
  AUTH_TOKEN_1,
  MONGO_CONNECTION,
  USER_1
} from '../test.data'

describe('/auth', () => {

  const URL_AUTH_V1 = `${CONFIG.ALPHA_AUTH_REST_ROOT}/v1/auth`

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

  describe('GET', () => {

    test('Returns 401 when no token is provided', () => {
      return request(app)
        .get(`${URL_AUTH_V1}`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 401 when invalid token is provided', () => {
      return request(app)
        .get(`${URL_AUTH_V1}`)
        .set({
          Authorization: 'dummy'
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error: Error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 200 when valid token is provided', () => {
      return request(app)
        .get(`${URL_AUTH_V1}`)
        .set({
          Authorization: AUTH_TOKEN_1
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
          expect(response.body.id).toEqual(USER_1.id);
          expect(response.body.name).toEqual(USER_1.name);
        })
        .catch((error: Error) => {
            expect(error).toBe(null)
        })
    })
  })

  describe('POST', () => {
    test('Returns 401 when no token is provided', () => {
      return request(app)
        .post(`${URL_AUTH_V1}`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 401 when invalid credentials are provided', () => {
      return request(app)
        .post(`${URL_AUTH_V1}`)
        .send({
          username: 'dummy',
          password: 'dummy'
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 200 when valid credentials are provided', () => {
      return request(app)
        .post(`${URL_AUTH_V1}`)
        .send({
          username: ACCOUNT_1.username,
          password: 'a'
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)

          expect(response.body.token).toEqual(AUTH_TOKEN_1)

          expect(response.body.user.id).toEqual(USER_1.id)
          expect(response.body.user.description).toEqual(USER_1.description)
          expect(response.body.user.name).toEqual(USER_1.name)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })
  })

  describe('DELETE', () => {
    test('Returns 401 when no token is provided', () => {
      return request(app)
        .delete(`${URL_AUTH_V1}`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 401 when invalid token is provided', () => {
      return request(app)
        .delete(`${URL_AUTH_V1}`)
        .set({
          Authorization: 'dummy'
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 200 when valid token is provided', () => {
      return request(app)
        .delete(`${URL_AUTH_V1}`)
        .set({
          Authorization: AUTH_TOKEN_1
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })
  })
})
