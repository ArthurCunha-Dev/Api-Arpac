const query = (userCpf) => {
  const newQuery = [
    {
      $match: {
        cpf : userCpf
      }
    }
  ]

  return newQuery
}

export default {
  collection: 'user',
  query
}
