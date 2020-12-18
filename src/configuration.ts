import Logger from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

//
const CONFIG = {
  ALPHA_AUTH_DATABASE_CONN: '',

  ALPHA_AUTH_REST_PROTOCOL: 'http',
  ALPHA_AUTH_REST_HOST: 'localhost',
  ALPHA_AUTH_REST_PORT: '8090',
  ALPHA_AUTH_REST_ROOT: '',

  ALPHA_AUTH_SMTP_HOST: '',
  ALPHA_AUTH_SMTP_PORT: '',
  ALPHA_AUTH_SMTP_USER: '',
  ALPHA_AUTH_SMTP_PASS: '',
}

// Load config from local file
try {
  const CONFIG_LOCAL = require('./config.json')
  Object.keys(CONFIG).forEach((key) => {
    CONFIG[key] = CONFIG_LOCAL[key] || CONFIG[key]
  })

} catch (error) {
  LOGGER.warn('Failed to load config.json')
}

// Load config from env
try {
  Object.keys(CONFIG).forEach((key) => {
    CONFIG[key] = process.env[key] || CONFIG[key]
  })
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('== -----------------------------')
Object.keys(CONFIG).forEach((key) => console.log(`== ${key}: ${CONFIG[key]}`))
console.log('== -----------------------------')

export default CONFIG
