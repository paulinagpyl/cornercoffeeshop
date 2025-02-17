const { Router } = require('express')
const usuariosController = require('../controllers/usuarios.controller.js')

const router = Router()

router.post('/register', usuariosController.register)
router.post('/login', usuariosController.login)

module.exports = router
