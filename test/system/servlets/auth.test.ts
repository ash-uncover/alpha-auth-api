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
  MONGO_CONNECTION
} from '../test.data'

describe('/auth', () => {

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
    return await SCHEMAS.ACCOUNTS.model.create(ACCOUNT_1)
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
        .get(`/auth`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 401 when invalid token is provided', () => {
      return request(app)
        .get(`/auth`)
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
        .get(`/auth`)
        .set({
          Authorization: AUTH_TOKEN_1
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
          expect(response.body).toEqual({
            userId: ACCOUNT_1.userId
          })
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })
  })

  describe('POST', () => {
    test('Returns 401 when no token is provided', () => {
      return request(app)
        .post(`/auth`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 401 when invalid token is provided', () => {
      return request(app)
        .post(`/auth`)
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
        .post(`/auth`)
        .set({
          Authorization: AUTH_TOKEN_1
        })
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
          expect(response.body).toEqual({
            userId: ACCOUNT_1.userId
          })
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })
  })

  describe('DELETE', () => {
    test('Returns 401 when no token is provided', () => {
      return request(app)
        .delete(`/auth`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.UNAUTHORIZED)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })

    test('Returns 401 when invalid token is provided', () => {
      return request(app)
        .delete(`/auth`)
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
        .delete(`/auth`)
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
