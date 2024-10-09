
import * as CreateUsersController from './controllers/CreateUsersController.mjs'
import * as SearchUsersController from './controllers/SearchUsersController.mjs'
import * as UpdateUsersController from './controllers/UpdateUsersController.mjs'
import * as DeleteUsersController from './controllers/DeleteUsersController.mjs'

import { Router } from 'express'

const router = Router()


router.route('/v1/user/').post(CreateUsersController.create)
router.route('/v1/user/id').get(SearchUsersController.search)
router.route('/v1/user/id').put(UpdateUsersController.update)
router.route('/v1/user/id').delete(DeleteUsersController.remove)

router.route('/v1/proximavisita').get(SearchUsersController.teste)


export default router
