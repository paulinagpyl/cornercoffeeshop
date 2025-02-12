import { Router } from 'express'
import * as personalController from '../controllers/personal.controller.js'

const router = Router()

router.get('/personal', personalController.findAll)
router.get('/personal/:id', personalController.findById)
router.post('/personal', personalController.create)
router.put('/personal/:id', personalController.updateById)
router.delete('/personal/:id', personalController.deleteById)

export default router
