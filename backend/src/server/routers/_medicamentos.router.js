import { Router } from 'express'
import * as medicamentosController from '../controllers/medicamentos.controller.js'
import { authToken } from '../middlewares/medicamentos.middleware.js'

const router = Router()

router.get('/medicamentos', authToken, medicamentosController.findAll)
router.get('/medicamentos/:id', authToken, medicamentosController.findById)
router.post('/medicamentos', authToken, medicamentosController.create)
router.put('/medicamentos/:id', authToken, medicamentosController.updateById)
router.delete('/medicamentos/:id', authToken,medicamentosController.deleteById)

export default router
