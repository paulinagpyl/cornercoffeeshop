const { Router } = require('express')
const authMiddleware = require('../middlewares/auth.middleware.js')
const usuariosController = require('../controllers/usuarios.controller.js')

const router = Router()

// Registro y autenticación (sin autenticación)
router.post('/register', usuariosController.register)
router.post('/login', usuariosController.login)
router.post('/logout', usuariosController.logout)

// Ruta para checkout
router.post('/checkout', authMiddleware, usuariosController.checkout)

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
