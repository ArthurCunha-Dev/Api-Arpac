const query = (params) => {
  const newQuery = [
    {
      $match: 
      {
        "email": params.email
      }
    }
  ]

  return newQuery
}

export default {
  collection: 'user',
  query
}
