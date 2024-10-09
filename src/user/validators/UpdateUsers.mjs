/* eslint-disable no-param-reassign */

import Ajv from 'ajv'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'

let ajv = new Ajv({ allErrors: true, jsonPointers: true })

const schema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid'
    },
    name: {
      type: 'string'
    },
    cpf: {
      type: 'string',
      pattern: '^[0-9]*$', 
      minLength: 11,
      maxLength: 11
    },
    email: {
      type: 'string',
      format: 'email'
    },
    cellPhone: {
      type: 'string',
      minLength: 11,
      maxLength: 11,
    },
    
  },
  required: [
    'id'
  ],
  additionalProperties: false
}

async function validate(data) {
  
  if(data.cpf){
    if(isNaN(Number(data.cpf)) || ( Number(data.cpf) < 1)){

      let result  = 
          {
            "keyword": "only number",
            "dataPath": "/cpf",
            "schemaPath": "#/properties/cpf/format",
            "params": {
              "format": "cpf"
            },
            "message": "invalid cpf format"
          }   
  
      throw new InvalidParameterException(JSON.stringify(result))
    }
  }
  


  if(data.email){
    if (!(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(data.email)) {
      let result = {
        "keyword": "format",
        "dataPath": "/email",
        "schemaPath": "#/properties/email/pattern",
        "params": {
          "format": "email"
        },
        "message": "Invalid email format"
      };
      throw new InvalidParameterException(JSON.stringify(result));
    }
  }
  
  const validateUser = ajv.compile(schema)
  const result = validateUser(data)

  if (result) {
    return result
  }

  throw new InvalidParameterException(JSON.stringify(validateUser.errors))
}

export default {
  validate
}
