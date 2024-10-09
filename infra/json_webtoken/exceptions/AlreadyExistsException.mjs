import BaseException from './BaseException.mjs'

class DataAlreadyExistsException extends BaseException {
  constructor(message = 'Already exists') {
    super(409, message, true)
  }
}

export default DataAlreadyExistsException




