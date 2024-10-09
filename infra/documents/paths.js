import healthCheck from './paths/healthCheck.js'
import user from './paths/user.js'
import authentication from './paths/authentication.js'

let paths = Object.assign(
  healthCheck,
  user,
  authentication 
)

export default paths
