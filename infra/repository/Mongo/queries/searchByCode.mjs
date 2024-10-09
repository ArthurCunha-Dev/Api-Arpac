
const query = (code) => {
  const newQuery = [
    {
      $match: {
        code     
    }
  }
  ]

  return newQuery
}

export default {
  collection: 'codePassword',
  query
}
