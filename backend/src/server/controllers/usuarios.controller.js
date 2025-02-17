const sql = require('../models/usuarios.model.js')
const { jwtSign } = require('../../util/auth/jwt.js')

const register = (req, res) => {
  sql.register(req.body)
    .then((result) => {
      console.log('hola222')
      if (result.code) {
        return res.status(500).json({ status: false, code: 500, message: result })
      }
      res.status(201).json({ status: true, code: 201, message: 'Usuario creado con éxito' })
    })
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))
}

const login = (req, res) => {
  sql.login(req.body)
    .then((result) => {
      if (result.length === 0) {
        console.log('entra largo cero', { result })
        res.status(401).json({ status: false, code: 401, message: 'Usuario y/o contraseña no existen' })
        return
      }
      const token = jwtSign(result[0])
      console.log('por aca', { token })
      res.status(200).json({ status: true, code: 200, message: { token } })
    })
    .catch((error) => res.status(500).json({ status: false, code: 500, message: error }))
}

module.exports = {
  register,
  login
}
