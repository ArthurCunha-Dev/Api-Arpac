/* eslint-disable no-param-reassign */

import Ajv from 'ajv'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'

let ajv = new Ajv({ allErrors: true, jsonPointers: true })

const schemaRefreshToken = {
  type: 'object',
  properties: {
    refreshToken: {
      type: 'string'
     }
  },
  required: [     
    'refreshToken'     
  ],
  additionalProperties: false
}

async function validate(data) {
   
  const validateRefreshToken = ajv.compile(schemaRefreshToken)
  const result = validateRefreshToken(data)

  if (result) {
    return result
  }

  throw new InvalidParameterException(JSON.stringify(validateRefreshToken.errors))
}

export default {
  validate
}
