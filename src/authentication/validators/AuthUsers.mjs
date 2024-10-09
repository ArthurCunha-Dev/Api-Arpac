/* eslint-disable no-param-reassign */

import Ajv from 'ajv'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'

let ajv = new Ajv({ allErrors: true, jsonPointers: true })

const schemaAuthUser = {
  type: 'object',
  properties: {
    email: {
      type: 'string'    
    },
    password: {
      type: 'string'    
    }
  },
  required: [
    'password',
    'email'
  ],
  additionalProperties: false
}

async function validate(data) {
  const validateAhtUser = ajv.compile(schemaAuthUser)
  const result = validateAhtUser(data)

  if (result) {
    return result
  }

  throw new InvalidParameterException(JSON.stringify(validateAhtUser.errors))
}

export default {
  validate
}
