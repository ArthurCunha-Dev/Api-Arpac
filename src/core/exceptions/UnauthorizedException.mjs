import BaseException from './BaseException.mjs'
import StatusCode from '../http/StatusCode.mjs'

class UnauthorizedException extends BaseException {
  constructor(message = 'Not authorized') {
    super(StatusCode.UNAUTHORIZED, message, true)
  }
}

export default UnauthorizedException
