const express = require('express')
const cors = require('cors')
require('dotenv').config()

const { serverLog } = require('./middlewares/serverLog.middleware.js')
const { usuariosRouter, productosRouter, errors } = require('./routers/index.js')
const { ClientBase } = require('pg')

const app = express()
const PORT = process.env.PORT ?? 3000
const { CLIENT_URL} = process.env
// console.log ({CLIENT_URL})

// app.use(cors()) se cambia para restringir el back de solo el front nuestro
app.use(cors({
    origin: [CLIENT_URL],
    methods:['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:[
        'Content-Type',
        'Authorization',
        'Access-Control-Allow-Origin',
    ],
}))

app.use(express.json())

app.use(serverLog)

app.use(productosRouter)
app.use(usuariosRouter)
app.use(errors)

app.listen(PORT, () => console.log('Server UP!!'))

module.exports = app
