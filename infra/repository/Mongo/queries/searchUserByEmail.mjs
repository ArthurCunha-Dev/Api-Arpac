const query = (userEmail) => {
  const newQuery = [
    {
      $match: {
        email : userEmail
      }
    }
  ]

  return newQuery
}

export default {
  collection: 'user',
  query
}
