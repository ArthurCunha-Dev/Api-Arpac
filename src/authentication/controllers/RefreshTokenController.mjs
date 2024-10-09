/* eslint-disable max-len */

import UserRepository from '../repositories/Authentication.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import RefreshToken from '../use_cases/RefreshToken.mjs'
import { default as RefreshTokenValidator } from '../validators/RefreshToken.mjs'


const Repository = new UserRepository(RepositoryImpl)

export async function execute(request, response, next) {
  try { 
    const refreshToken = request.body   
    await RefreshTokenValidator.validate(refreshToken)

    const refreshTokenUseCase = new RefreshToken(Repository)
    const result = await refreshTokenUseCase.execute(refreshToken)    
    return response.status(200).json({message: 'Token refreshed successfully', result})
  } catch (error) {
    return next(error)
  }
}

