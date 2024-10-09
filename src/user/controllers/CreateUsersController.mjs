/* eslint-disable max-len */

import { default as UsersIdPresenter } from '../presenters/CreateUsersById.mjs'
import UsersRepository from '../repositories/Users.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import CreateUserId from '../useCases/CreateUsers.mjs'
import { default as CreateUsersIdValidator } from '../validators/CreateUsers.mjs'
import bcrypt from 'bcrypt';

const Repository = new UsersRepository(RepositoryImpl)

export async function create(request, response, next) {
  try {
    const userDto = request.body
    await CreateUsersIdValidator.validate(userDto)
    
    userDto.password = await bcrypt.hash(userDto.password, 10);
    const createUsersIdUseCase = new CreateUserId(Repository)
    const resultUsers = await createUsersIdUseCase.execute(userDto)
    const presentUsers = await UsersIdPresenter.present(resultUsers)
    return response.status(201).json(presentUsers)
  } catch (error) {
    return next(error)
  }
}
