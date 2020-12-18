import * as TokenGenerator from '../../../src/lib/TokenGenerator'

const INTEGERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

describe('TokenGenerator', () => {
  describe('nextToken', () => {
    test('has the correct format', () => {
      const result = TokenGenerator.nextToken()
      const splitted = result.split('')
      expect(result.length).toBe(8)
      expect(INTEGERS.includes(splitted[0])).toBe(true)
      expect(INTEGERS.includes(splitted[1])).toBe(true)
      expect(splitted[2]).toEqual(' ')
      expect(INTEGERS.includes(splitted[3])).toBe(true)
      expect(INTEGERS.includes(splitted[4])).toBe(true)
      expect(splitted[5]).toEqual(' ')
      expect(INTEGERS.includes(splitted[6])).toBe(true)
      expect(INTEGERS.includes(splitted[7])).toBe(true)
    })
  })

})
