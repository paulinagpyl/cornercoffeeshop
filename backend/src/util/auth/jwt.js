// Implements jwt functionality
const jwt = require('jsonwebtoken')

const KEY = process.env.JWT_SECRET_KEY

const jwtSign = (payload) => jwt.sign(payload, KEY)

const jwtVerify = (token) => jwt.verify(token, KEY)

module.exports = {
  jwtSign,
  jwtVerify
}
