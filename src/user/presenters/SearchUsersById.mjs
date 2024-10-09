import UUIDGenerator from '../../support/UUIDGenerator.mjs'

const presenterMap = (data) => {
  const resultUsersSpecifications = data.map((Temp) => {
  let idEquipamento = UUIDGenerator.from(Temp._id).toString()
  let idEmpresa= UUIDGenerator.from(Temp.idEmpresa).toString()
  Temp.dataVisitaRecente._id =UUIDGenerator.from(Temp.dataVisitaRecente._id).toString()
  Temp.dataVisitaAnterior._id =UUIDGenerator.from(Temp.dataVisitaAnterior._id).toString()
  delete Temp.idEmpresa 
  delete Temp._id
//Analisar atributos de retorno

    let result = {
      // id: id.toString(),
      // language: Temp.language,
      // type: Temp.type,
      // idType: Temp.idType,
      // yearsUsefulLife: Temp.yearsUsefulLife,
      idEmpresa,
      idEquipamento,     
      ...Temp

    }

    return result
  })

  return resultUsersSpecifications
}

const presenter = async (data) => {
  let idEquipamento = UUIDGenerator.from(data._id).toString()
  let result = { 
    idEquipamento,   
    ...data


  }

  return result
}

export default {
  present: presenter,
  presentMap: presenterMap
}
