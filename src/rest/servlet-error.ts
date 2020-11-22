
export const sendError = (logger, res, error) => {
  logger.debug(`HTTP ${error.status} - ${error.error}`)
  res.send(error.status, error)
}

const ERRORS = {
  NOT_FOUND: {
    error: 'NOT_FOUND',
    status: 404
  },
  USER_USERNAME_INUSE: {
    error: 'USER_USERNAME_INUSE',
    status: 400
  },
  USER_EMAIL_INUSE: {
    error: 'USER_EMAIL_INUSE',
    status: 400
  }
}

export default ERRORS