import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'
//import InvalidParameterException from '../core/exceptions/InvalidParameterException.mjs'
import InvalidParameterException from '../../core/exceptions/InvalidParameterException.mjs'
import UnauthorizedException from '../../core/exceptions/UnauthorizedException.mjs'
import bcrypt from 'bcrypt'


class CreateUsers {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(params) {
  
    const result = await this.repository.getByCode(params.code);

    if (result.length < 1) {
      throw new DataNotFoundException('Code not found.');
    }

    if (result[0].codeExpires < new Date()) {
      throw new UnauthorizedException('Expired code.');
    }
    
    const userDto = {
      _id : result[0].idUser,
      password:  await bcrypt.hash(params.newPassword, 10),
      updated_at : new Date()
    }

    const res = await this.repository.update(userDto)
    if (res.modifiedCount === 0) {
      throw new InvalidParameterException('New password was not saved.')
    }   
    
    return true;
  }
}

export default CreateUsers;
