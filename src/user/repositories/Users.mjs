class Users {
  constructor(repositoryImpl) {
    this.collection = 'user'      
    this.repository = repositoryImpl
  }

  async save(user) {
    return this
      .repository
      .save(this.collection, user)
  }

  async update(user) {
    return this
      .repository
      .update(this.collection, user)
  }

  async remove(id) {
    const data = await this
      .repository
      .remove(this.collection, id)

  

    return data
  }

 
  async getById(id) {
    const data = await this.repository.get(this.collection, id)
    return data
  }

  async teste() {
    const data = await this
    .repository
    .searchProximaVista()

  return data
  }
 

  async getUsers(params, pagination) {
    const data = await this
      .repository
      .searchUsers(this.collection, params, pagination)
    
    return data
  }

  async getUsersCount(params) {
    const data = await this
      .repository
      .searchUsersCount(this.collection, params)
   
    return data
  }

 
  async getUserByCpf(userCpf) {
    const data = await this
      .repository
      .searchUserByCpf(userCpf)

    return data
  }

  async getUserByEmail(userEmail) {
    const data = await this
      .repository
      .searchUserByEmail(userEmail)

    return data
  }
}

export default Users
