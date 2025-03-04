const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_SECRET_KEY

// console.log('🔑 JWT_SECRET_KEY:', KEY ? '✅ Definida' : '❌ No definida') // Verificar si la clave está disponible

const jwtSign = (payload) => {
  try {
    const token = jwt.sign(payload, KEY, { expiresIn: '2h' })
    // console.log('🔐 Token generado:', token) // Verificar el token generado
    return token
  } catch (error) {
    console.error('❌ Error al firmar el token:', error.message)
    throw new Error('Error al generar el token')
  }
}

const jwtVerify = (token) => {
  try {
    return jwt.verify(token, KEY)
  } catch (error) {
    console.error('❌ Error al verificar el token:', error.message)
    throw new Error('Token inválido')
  }
}

module.exports = {
  jwtSign,
  jwtVerify
}
