const { Router } = require('express')
const usuariosController = require('../controllers/usuarios.controller.js')
const authMiddleware = require('../middlewares/auth.middleware.js')

const router = Router()

// Registro y autenticación (sin autenticación)
router.post('/register', usuariosController.register)
router.post('/login', usuariosController.login)
router.post('/logout', usuariosController.logout)

// Gestión de perfil (requiere autenticación)
router.get('/profile', authMiddleware, usuariosController.getProfile)
router.put('/profile', authMiddleware, usuariosController.updateProfile)
router.delete('/profile', authMiddleware, usuariosController.deleteAccount)

// Gestión de usuarios (requiere autenticación, posiblemente admin)
router.get('/', authMiddleware, usuariosController.getAllUsers)
router.get('/:id', authMiddleware, usuariosController.getUserById)
router.put('/:id', authMiddleware, usuariosController.updateUser)
router.delete('/:id', authMiddleware, usuariosController.deleteUser)

module.exports = router
