import { Router } from 'express'
import * as usuariosController from '../controllers/usuarios.controller.js'

const router = Router()

router.post('/register', usuariosController.register)
router.post('/login', usuariosController.login)

export default router

