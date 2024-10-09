class Auth {
  constructor(repositoryImpl) {
    this.collection = 'user'
    this.collectionCode = 'codePassword'    
    this.collectionUserToken = 'userTokens'
    this.collectionRefreshToken = 'refreshToken'
    this.repository = repositoryImpl
  }

  async save(dto) {
    return this.repository.save(this.collection, dto)
  }

  async update(dto) {
    return this.repository.update(this.collection, dto)
  }

  async remove(id) {
    const data = await this.repository.remove(this.collection, id)
    return data
  }

  async getById(id) {
    const data = await this.repository.get(this.collection, id)
    return data
  }

  async saveCode(dataCode) {
    return this.repository.save(this.collectionCode, dataCode)
  }

  async saveToken(tokenDto) {
    return this.repository.save(this.collectionUserToken, tokenDto)
  }
  
  async saveRefreshToken(refreshTokenDto) {
    return this
      .repository
      .save(this.collectionRefreshToken, refreshTokenDto)
  }

  async removeResfreshToken(id) {
    const data = await this.repository.remove(this.collectionRefreshToken, id)
    return data
  }   
  
  async getUserById(params) {
    const data = await this.repository.searchUserById(params)  
    return data
  }  

  async getUserByCpf(userCpf) {
    const data = await this.repository.searchUserByCpf(userCpf)
    return data
  }
  
  async getUserByEmail(userEmail) {
    const data = await this.repository.searchUserByEmail(userEmail)
    return data
  }

  async getByCode(code) {
    const data = await this.repository.searchByCode(code)
    return data
  }

  async getAuthUsers(params) {
    const data = await this.repository.searchAuthUsers(params)
    return data
  }

  async getRefreschToken(params) {
    const data = await this.repository.searchRefreschToken(params)
    return data
  }

}

export default Auth
