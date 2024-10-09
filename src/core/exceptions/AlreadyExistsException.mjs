import BaseException from './BaseException.mjs'
import StatusCode from '../http/StatusCode.mjs'

class AlreadyExistsException extends BaseException {
  constructor(message = 'already exists') {
    super(StatusCode.CONFLICT(), message, true)
  }
}

export default AlreadyExistsException
