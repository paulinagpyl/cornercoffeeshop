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
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

const login = (req, res) => {
  sql.login(req.body)
    .then((result) => {
      if (result.length === 0) {
        return res.status(401).json({ status: false, code: 401, message: 'Usuario y/o contraseña no existen' })
      }

      const payload = {
        usuario_id: result.usuario_id,
        nombre: result.nombre,
        apellido: result.apellido,
        rol: result.rol
      }

      const token = jwtSign(payload)

      res.status(200).json({ status: true, code: 200, token })
    })
    .catch((error) => {
      res.status(500).json({ status: false, code: 500, message: error.message })
    })
}

// Cerrar sesión (solo para frontend)
const logout = (req, res) => {
  res.status(200).json({ status: true, code: 200, message: 'Sesión cerrada con éxito' })
}

// Obtener perfil de usuario
const getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ status: false, code: 401, message: 'No autorizado. Token inválido o expirado' })
    }

    const userId = req.user.usuario_id

    const user = await sql.getUserById(userId)

    if (!user) {
      return res.status(404).json({ status: false, code: 404, message: 'Usuario no encontrado' })
    }

    res.status(200).json({ status: true, code: 200, user })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Actualizar perfil de usuario
const updateProfile = async (req, res) => {
  try {
    const userId = req.user.usuario_id
    const result = await sql.updateUser(userId, req.body)

    if (!result) {
      return res.status(500).json({ status: false, code: 500, message: 'Error al actualizar el perfil' })
    }

    res.status(200).json({ status: true, code: 200, message: 'Perfil actualizado con éxito' })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Eliminar cuenta de usuario
const deleteAccount = async (req, res) => {
  try {
    const userId = req.user.usuario_id
    const result = await sql.deleteUser(userId)

    if (!result) {
      return res.status(500).json({ status: false, code: 500, message: 'Error al eliminar la cuenta' })
    }

    res.status(200).json({ status: true, code: 200, message: 'Cuenta eliminada con éxito' })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Obtener todos los usuarios (Admin)
const getAllUsers = async (req, res) => {
  try {
    const users = await sql.getAllUsers()

    res.status(200).json({ status: true, code: 200, users })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Obtener usuario por ID (Admin)
const getUserById = async (req, res) => {
  try {
    const user = await sql.getUserById(req.params.id)

    if (!user) {
      return res.status(404).json({ status: false, code: 404, message: 'Usuario no encontrado' })
    }

    res.status(200).json({ status: true, code: 200, user })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Actualizar usuario por ID (Admin)
const updateUser = async (req, res) => {
  try {
    const result = await sql.updateUser(req.params.id, req.body)

    if (!result) {
      return res.status(500).json({ status: false, code: 500, message: 'Error al actualizar el usuario' })
    }

    res.status(200).json({ status: true, code: 200, message: 'Usuario actualizado con éxito' })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Eliminar usuario por ID (Admin)
const deleteUser = async (req, res) => {
  try {
    const result = await sql.deleteUser(req.params.id)

    if (!result) {
      return res.status(500).json({ status: false, code: 500, message: 'Error al eliminar el usuario' })
    }

    res.status(200).json({ status: true, code: 200, message: 'Usuario eliminado con éxito' })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

// Función para realizar el checkout
const checkout = async (req, res) => {
  try {
    const { items, totalAmount } = req.body

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ status: false, code: 400, message: 'No se han proporcionado productos para comprar' })
    }

    if (totalAmount <= 0) {
      return res.status(400).json({ status: false, code: 400, message: 'El monto total debe ser mayor a cero' })
    }

    const userId = req.user.usuario_id

    // Guardar la orden en la base de datos
    const orderResult = await sql.createOrder(userId, items, totalAmount)

    if (!orderResult) {
      return res.status(500).json({ status: false, code: 500, message: 'Error al procesar la orden' })
    }

    res.status(200).json({ status: true, code: 200, message: 'Orden procesada con éxito', orderId: orderResult.insertId })
  } catch (error) {
    res.status(500).json({ status: false, code: 500, message: error.message })
  }
}

module.exports = {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteAccount,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  checkout // Nueva función de checkout
}
