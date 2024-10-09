
const query = (params) => ({
  $and: [{
      idUser: params.idUser
  }, {
      refresh_token: params.refreshToken
  }]
})

export default {
  collection: 'userTokens',
  query
}
