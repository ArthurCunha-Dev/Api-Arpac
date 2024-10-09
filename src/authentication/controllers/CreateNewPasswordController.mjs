/* eslint-disable max-len */

import UserRepository from '../repositories/Authentication.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import CreateNewPassword from '../use_cases/CreateNewPassword.mjs'
import { default as CreatePasswordValidator } from '../validators/CreatNewPassword.mjs'


const Repository = new UserRepository(RepositoryImpl)

export async function execute(request, response, next) {
  try { 
    const newPassword = request.body   
    await CreatePasswordValidator.validate(newPassword)

    const createNewPasswordUseCase = new CreateNewPassword(Repository)
    const result = await createNewPasswordUseCase.execute(newPassword)    
    return response.status(200).json({msg:'Password updated successfully.'})
  } catch (error) {
    return next(error)
  }
}
