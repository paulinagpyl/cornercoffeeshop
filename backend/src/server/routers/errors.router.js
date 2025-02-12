import { Router } from 'express'
import * as errorsController from '../controllers/errors.controller.js'

const router = Router()

router.all('*', errorsController.notFound)

export default router
