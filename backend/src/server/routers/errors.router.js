const express = require('express')
const errorsController = require('../controllers/errors.controller.js')

const router = express.Router()

router.all('*', errorsController.notFound)

module.exports = router
