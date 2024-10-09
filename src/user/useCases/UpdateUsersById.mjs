/* eslint-disable max-len */
/* eslint-disable no-param-reassign */

import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'
import AlreadyExistsException from '../../core/exceptions/AlreadyExistsException.mjs'
import UUIDGenerator from '../../support/UUIDGenerator.mjs'

class UpdateUsers {
  constructor(repository) {
    this.repository = repository
  }

  async execute(userDto) {

    const cpfUser = await this.repository.getUserByCpf(userDto.cpf)
    if (cpfUser.length > 0) {
      throw new AlreadyExistsException('CPF already exists.');
    }

    if(userDto.email){
      userDto.email = userDto.email.toLowerCase();
      const emailUser = await this.repository.getUserByEmail(userDto.email)
      if (emailUser.length > 0) {
        throw new AlreadyExistsException('Email already exists.');
          } 
  }
   
    
    userDto._id = UUIDGenerator.from(userDto.id)
    delete userDto.id
    userDto.updated_at = new Date();    
    const result = await this.repository.update(userDto);

    if (result.modifiedCount === 0) {
      throw new DataNotFoundException('User not found.')
    }

    return userDto;
  }
}

export default UpdateUsers
