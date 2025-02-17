const express = require('express')
const cors = require('cors')

const { serverLog } = require('./middlewares/serverLog.middleware.js')
const { usuariosRouter, productosRouter, errors } = require('./routers/index.js')

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.use(serverLog)

app.use(usuariosRouter)
app.use(productosRouter)
app.use(errors)

app.listen(PORT, () => console.log('Server UP!!'))

module.exports = app
