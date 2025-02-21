const sql = require('../models/usuarios.model.js')
const { jwtSign } = require('../../util/auth/jwt.js')

const register = async (req, res) => {
  try {
    const result = await sql.register(req.body)

    if (!result || result.code) {
      return res.status(500).json({ status: false, code: 500, message: 'Error al registrar usuario' })
    }

    res.status(201).json({ status: true, code: 201, message: 'Usuario creado con éxito' })
  } catch (error) {
    console.error('❌ Error en register:', error.message)
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

const login = (req, res) => {
  sql.login(req.body)
    .then((result) => {
      if (result.length === 0) {
        console.log('🔴 Usuario no encontrado:', { result })
        return res.status(401).json({ status: false, code: 401, message: 'Usuario y/o contraseña no existen' })
      }

      const payload = {
        usuario_id: result.usuario_id,
        nombre: result.nombre,
        apellido: result.apellido,
        rol: result.rol
      }

      const token = jwtSign(payload) // Genera el token con los datos correctos
      console.log('📤 Enviando respuesta con token:', token)

      res.status(200).json({ status: true, code: 200, token }) // Enviar el token correctamente
    })
    .catch((error) => {
      console.error('❌ Error en login:', error.message)
      res.status(500).json({ status: false, code: 500, message: error.message })
    })
}

module.exports = {
  register,
  login
}
