import dotenv from 'dotenv/config'
import jwt from 'jsonwebtoken'
import auth from '../../../config/auth.mjs'
import ms from 'ms'


const generateToken = (idUser) => { 

  const {
    secret_token,        
    secret_refresh_token,
    expires_in_token,
    expires_in_refresh_token
  } = auth

  const expiresToken =  Date.now() + ms(expires_in_token) 
  const token = jwt.sign(
    {
      idUser,
      expiresIn : expiresToken,          
    },
    secret_token,
  ) 
  
  const expiresRefreshToken =  Date.now() + ms(expires_in_refresh_token)
  const refresh_token = jwt.sign(
    {
      idUser,
      expiresIn : expiresRefreshToken
    },
    secret_refresh_token,
  )      
        
  return {
    token, 
    refresh_token,
    expiresTokenDate: new Date(expiresToken)  
  } 
}

export default {
  generateToken
}
  