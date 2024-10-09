/* eslint-disable max-len */
/* eslint-disable no-param-reassign */


import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs'
import UUIDGenerator from '../../support/UUIDGenerator.mjs'

class SearchUsers {
  constructor(repository) {
    this.repository = repository
  }

  async execute(userId) {
    const id = UUIDGenerator.from(userId.id)
    const resultUser = await this.repository.getById(id)
    if (!resultUser) {
      throw new DataNotFoundException('User not found.')
    }
    return resultUser
  }

  async execute() {
    const resultUser = await this.repository.teste()

    const newRes = resultUser.map((data) => {
        console.log(data)
        let x = 2000 - data.dataVisitaRecente.horasEquipamento;
        let y = x / data.mediaHorasPorDia;
    
        // Cria um objeto Date a partir da string dataVisita, se ainda não for um objeto Date
        let dataVisita = new Date(data.dataVisitaRecente.dataVisita);
        let proximaVisitaDate = new Date(dataVisita.getTime() + y * 24 * 60 * 60 * 1000); // y dias em milissegundos
    
        // Formata o resultado com a nova data de visita calculada
        let result = {
          proximaVisita: proximaVisitaDate.toISOString(),
          ...data
        };
    
        return result
      })
    
      if (!resultUser) {
      throw new DataNotFoundException('User not found.')
    }
    return newRes
  }
}

export default SearchUsers
