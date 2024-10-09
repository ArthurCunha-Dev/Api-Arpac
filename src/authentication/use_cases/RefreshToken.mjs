/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import UUIDGenerator from '../../support/UUIDGenerator.mjs'
import  auth from '../../../config/auth.mjs'
import { default as GenerateToken } from '../use_cases/GenerateToken.mjs'

class RefreshToken {
  constructor(repository) {
    this.repository = repository
  }

  async execute(data) {
      
    const params = jwt.verify(data.refreshToken, auth.secret_refresh_token)  
    const idUserRes = params.idUser  
    params.idUser = UUIDGenerator.from(params.idUser)
    params.refreshToken = data.refreshToken
    
    const result = await this.repository.getRefreschToken(params)
    if (result.length < 1) {
      throw new DataNotFoundException('RefreshToken not found.')
    }
    
    await this.repository.removeResfreshToken(result[0]._id)

    
    const resultToken = GenerateToken.generateToken(idUserRes)   
   
    const refresh_token_dto = {
        _id :  UUIDGenerator.generate(),
        refresh_token: resultToken.refresh_token ,
        idUser: result[0]._id,
        created_at : new Date(),
        expires_date: resultToken.expiresRefreschTokenDate
    }    
        
    await this.repository.saveRefreshToken(refresh_token_dto)       
    return {
      token: resultToken.token,
      expires_token: resultToken.expiresTokenDate,
      refresh_token: resultToken.refresh_token
    }
  }
}

export default RefreshToken
