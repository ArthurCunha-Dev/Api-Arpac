/* eslint-disable max-len */


import AuthRepository from '../repositories/Authentication.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import AuthUsers from '../use_cases/AuthUsers.mjs'
import { default as AuthUsersValidator } from '../validators/AuthUsers.mjs'


const Repository = new AuthRepository(RepositoryImpl)

export async function authUser(request, response, next) {
  try {    
    
    const authUser = request.body     
    await AuthUsersValidator.validate(authUser)

    const authUsersUseCase = new AuthUsers(Repository)
    const result = await authUsersUseCase.execute(authUser)
    return response.status(200).json({message: 'User successfully authenticated', result})

  } catch (error) {
    return next(error)
  }
}
