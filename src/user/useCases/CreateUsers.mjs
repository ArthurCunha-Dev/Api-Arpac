/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import AlreadyExistsException from '../../core/exceptions/AlreadyExistsException.mjs'
import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'
import UUIDGenerator from '../../support/UUIDGenerator.mjs'
// import bcrypt from 'bcrypt';

class CreateUsers {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(userDto) {
     
    userDto.email = userDto.email.toLowerCase();
    const cpfUserPromise = this.repository.getUserByCpf(userDto.cpf);
    const emailUserPromise = this.repository.getUserByEmail(userDto.email);
    const [cpfUser, emailUser] = await Promise.all([cpfUserPromise, emailUserPromise]);

     if (cpfUser.length > 0) throw new AlreadyExistsException('CPF already exists.')    
     if (emailUser.length > 0) throw new AlreadyExistsException('Email already exists.')
    


    const id = UUIDGenerator.generate()
    userDto._id = id
    userDto.created_at = new Date();
    const resultUser = await this.repository.save(userDto);
    if (!resultUser) {
      throw new DataNotFoundException('User not found.');
    }
    userDto._id = id
    return userDto;
  }
}

export default CreateUsers
