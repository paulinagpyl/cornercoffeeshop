const { Router } = require('express')
const usuariosController = require('../controllers/usuarios.controller.js')

const router = Router()

// Registro y autenticación
router.post('/register', usuariosController.register)
router.post('/login', usuariosController.login)
router.post('/logout', usuariosController.logout)

// Gestión de perfil
router.get('/profile', usuariosController.getProfile)
router.put('/profile', usuariosController.updateProfile)
router.delete('/profile', usuariosController.deleteAccount)

// Gestión de usuarios (para admin)
router.get('/', usuariosController.getAllUsers)
router.get('/:id', usuariosController.getUserById)
router.put('/:id', usuariosController.updateUser)
router.delete('/:id', usuariosController.deleteUser)

module.exports = router

// const { Router } = require('express')
// const usuariosController = require('../controllers/usuarios.controller.js')

// const router = Router()

// router.post('/register', usuariosController.register)
// router.post('/login', usuariosController.login)

// module.exports = router
