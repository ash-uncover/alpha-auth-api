module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx,js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/index.ts',
    '!**/index.tsx',
    '!**/index.js',
    '!**/index.jsx'
  ],
  coverageDirectory: 'test/__coverage__',
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'text-summary'
  ]
}