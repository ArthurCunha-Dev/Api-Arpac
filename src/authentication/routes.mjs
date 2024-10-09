import * as AuthUsersController from './controllers/AuthUsersController.mjs'
import * as ForgotPasswordController from './controllers/ForgotPasswordController.mjs'
import * as CreateNewPasswordController from './controllers/CreateNewPasswordController.mjs'
import * as RefreshTokenController from './controllers/RefreshTokenController.mjs'

import authToken from '../../infra/json_webtoken/authToken.mjs';
import { Router } from 'express'

const router = Router()

router.route('/v1/auth/login').post(AuthUsersController.authUser)
router.route('/v1/auth/forgot_password').post(ForgotPasswordController.execute)
router.route('/v1/auth/new_password').post(CreateNewPasswordController.execute)
router.route('/v1/auth/refresh_token').post(RefreshTokenController.execute)


export default router




