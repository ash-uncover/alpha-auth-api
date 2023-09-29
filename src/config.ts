import  {
  Logger,
  LogLevels
} from '@uncover/js-utils-logger'

const LOGGER = new Logger('CONFIG')
//
export const CONFIG = {
  ALPHA_AUTH_DATABASE_CONN: 'mongodb://127.0.0.1:4242/auth',

  ALPHA_AUTH_REST_PROTOCOL: 'http',
  ALPHA_AUTH_REST_HOST: 'localhost',
  ALPHA_AUTH_REST_PORT: '8090',
  ALPHA_AUTH_REST_ROOT: 'rest/api',
  ALPHA_AUTH_REST_ENVIRONMENT: 'local',

  ALPHA_AUTH_SMTP_HOST: '',
  ALPHA_AUTH_SMTP_PORT: '',
  ALPHA_AUTH_SMTP_USER: '',
  ALPHA_AUTH_SMTP_PASS: '',
}

// Load config from local file
try {
  const CONFIG_LOCAL = require('./configuration.json')
  Object.keys(CONFIG).forEach((key) => {
    CONFIG[key] = CONFIG_LOCAL[key] || CONFIG[key]
  })

} catch (error) {
  LOGGER.warn('Failed to load configuration.json')
}

// Load config from env
try {
  Object.keys(CONFIG).forEach((key) => {
    CONFIG[key] = process.env[key] || CONFIG[key]
  })
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

LOGGER.warn('== -----------------------------')
Object.keys(CONFIG).forEach((key) => LOGGER.warn(`== ${key}: ${CONFIG[key]}`))
LOGGER.warn('== -----------------------------')
