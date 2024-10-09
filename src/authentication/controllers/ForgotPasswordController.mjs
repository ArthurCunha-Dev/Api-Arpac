/* eslint-disable max-len */

import UserRepository from '../repositories/Authentication.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import ForgotPassword from '../use_cases/ForgotPassword.mjs'
import { default as ForgotPasswordValidator } from '../validators/ForgotPassword.mjs'


const Repository = new UserRepository(RepositoryImpl)

export async function execute(request, response, next) {
  try { 
    const email = request.body   
    await ForgotPasswordValidator.validate(email)

    const forgotPasswordUseCase = new ForgotPassword(Repository)
    const result = await forgotPasswordUseCase.execute(email)    
    return response.status(200).json({msg:'Code sent to your email.'})
  } catch (error) {
    return next(error)
  }
}
