import ERRORS, { sendError } from '../../../src/rest/servlet-error'

describe('servlet-error', () => {
  describe('sendError', () => {
    test('', () => {
      const spyDebug = jest.fn()
      const spySend = jest.fn()
      const spyStatus = jest.fn(() => ({ send: spySend }))

      const paramLogger = { debug: spyDebug }
      const paramRes = { status: spyStatus }
      const paramError = {
        status: 'status',
        error: 'error'
      }

      const result = sendError(paramLogger, paramRes, paramError)

      expect(spyDebug.mock.calls.length).toBe(1)
      expect(spyStatus.mock.calls.length).toBe(1)
      expect(spySend.mock.calls.length).toBe(1)
    })
  })

})
