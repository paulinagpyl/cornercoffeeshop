const { jwtVerify } = require('../../util/auth/jwt')

const authMiddleware = (req, res, next) => {
  try {
    console.log('🔍 Headers:', req.headers.authorization) // Agrega esta línea para ver si llega el token
    const token = req.headers.authorization?.split(' ')[1] // Obtener token del header
    if (!token) {
      return res.status(401).json({ status: false, code: 401, message: 'Token no proporcionado' })
    }

    const decoded = jwtVerify(token)
    req.user = decoded // Guardar datos del usuario en `req.user`
    next()
  } catch (error) {
    return res.status(401).json({ status: false, code: 401, message: 'Token inválido' })
  }
}

module.exports = authMiddleware
