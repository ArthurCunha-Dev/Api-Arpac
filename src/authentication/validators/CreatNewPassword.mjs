/* eslint-disable no-param-reassign */

import Ajv from 'ajv'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'

let ajv = new Ajv({ allErrors: true, jsonPointers: true })

const schemaAuthUser = {
  type: 'object',
  properties: {
    newPassword: {
      type: 'string',
      minLength: 6,
      maxLength: 10,
    }, 
    code: {
      type: 'string'      
    } 
  },
  required: [     
    'code',
    'newPassword'  
  ],
  additionalProperties: false
}

async function validate(data) {
  
  if(data.newPassword === data.confirmNewPassword){
    delete data.confirmNewPassword
  }else{
    let result  = 
          {
            "keyword": "different passwords",
            "dataPath": "/passaword",
            "schemaPath": "#/properties/passaword/format",
            "params": {
              "format": "passwords"
            },
            "message": "different passwords"
          }   
  
      throw new InvalidParameterException(JSON.stringify(result))
  }

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
