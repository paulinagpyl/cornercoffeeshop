const { jwtVerify } = require('../../util/auth/jwt')

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization
    console.log('🔍 Headers:', authHeader) // Verifica si el header está presente

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ status: false, code: 401, message: 'Token no proporcionado o formato incorrecto' })
    }

    const token = authHeader.split(' ')[1] // Obtener solo el token
    const decoded = jwtVerify(token)

    if (!decoded) {
      return res.status(401).json({ status: false, code: 401, message: 'Token inválido' })
    }

    req.user = decoded // Guardar datos del usuario en `req.user`
    console.log('✅ Usuario autenticado:', req.user) // Debug para ver el usuario autenticado
    next()
  } catch (error) {
    console.error('❌ Error en authMiddleware:', error.message)
    
    const errorMessage = error.name === 'TokenExpiredError' 
      ? 'Token expirado, por favor inicia sesión nuevamente' 
      : 'Token inválido'

    return res.status(401).json({ status: false, code: 401, message: errorMessage })
  }
}

module.exports = authMiddleware

