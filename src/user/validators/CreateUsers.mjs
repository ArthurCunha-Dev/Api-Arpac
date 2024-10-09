/* eslint-disable no-param-reassign */

import Ajv from 'ajv'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'

let ajv = new Ajv({ allErrors: true, jsonPointers: true })


const schemaUsers = {
  type: 'object',
  properties: {
    cpf: {
      type: 'string',
      pattern: '^[0-9]*$', 
      minLength: 11,
      maxLength: 11
      
    },
    name: {
      type: 'string'
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
    password: {
      type: 'string',
      minLength: 6,
      maxLength: 10,
    }    
  },
  required: [
    'cpf',
    'name',
    'email',
    'cellPhone',
    'password'
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
   
  const validateUsers = ajv.compile(schemaUsers)
  const result = validateUsers(data)

  if (result) {
    return result
  }

  throw new InvalidParameterException(JSON.stringify(validateUsers.errors))
}

export default {
  validate
}
