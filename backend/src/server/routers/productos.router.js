const { Router } = require('express')
const productosController = require('../controllers/productos.controller.js')

const router = Router()

router.get('/productos', productosController.ProductfindAll)
router.get('/productos/:id', productosController.ProductfindById)
router.post('/productos', productosController.Productcreate)
router.put('/productos/:id', productosController.ProductupdateById)
router.delete('/productos/:id', productosController.ProductdeleteById)

module.exports = router
