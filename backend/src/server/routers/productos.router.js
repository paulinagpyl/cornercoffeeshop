const { Router } = require('express')
const productosController = require('../controllers/productos.controller.js')

const router = Router()

router.get('/productos', productosController.findAll)
router.get('/productos/:id', productosController.findById)
router.post('/productos', productosController.create)
router.put('/productos/:id', productosController.updateById)
router.delete('/productos/:id', productosController.deleteById)

module.exports = router
