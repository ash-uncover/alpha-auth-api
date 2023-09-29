import mongoose from 'mongoose'
import request from 'supertest'

import { HttpUtils } from '@uncover/js-utils'

import { app } from '../../../src/rest'
import { CONFIG } from '../../../src/config'

describe('/health', () => {

  const URL_HEALTH = `${CONFIG.ALPHA_AUTH_REST_ROOT}/health`

  describe('GET', () => {

    test('Returns 200', () => {
      return request(app)
        .get(`${URL_HEALTH}`)
        .then(response => {
          expect(response.statusCode).toBe(HttpUtils.HttpStatus.OK)
        })
        .catch((error) => {
          expect(error).toBe(null)
        })
    })
  })
})
