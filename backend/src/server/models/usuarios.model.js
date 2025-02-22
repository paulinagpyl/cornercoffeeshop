const db = require('../database/db_connect.js')
const bcrypt = require('bcrypt')

// Función para registrar usuarios con contraseña encriptada
const register = async ({ nombre, apellido, email, pass, rol }) => {
  try {
    console.log('🔹 Registrando usuario:', { nombre, apellido, email, rol })
    // OJOOOOO  cuidado con el largo que puede ser mayor a lo que se guarda en pass de la BD
    const hashedPassword = await bcrypt.hash(pass, 10)
    console.log('🔐 Contraseña encriptada:', hashedPassword)

    const result = await db(
      'INSERT INTO usuarios (usuario_id, nombre, apellido, email, pass, rol) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING usuario_id, nombre, apellido, email, rol;',
      [nombre, apellido, email, hashedPassword, rol]
    )

    if (!result || result.length === 0) {
      throw new Error('Error al registrar el usuario')
    }

    console.log('✅ Usuario registrado con éxito:', result[0])
    return result[0]
  } catch (error) {
    console.error('❌ Error en register:', error.message)
    throw new Error('Error al registrar el usuario')
  }
}

// Función para login con verificación de contraseña encriptada
const login = async ({ email, password }) => {
  try {
    if (!email || !password) {
      throw new Error('Email y contraseña son obligatorios')
    }

    email = email.trim()
    password = password.trim()

    console.log('🔍 Iniciando sesión con:', { email })
    const user = await db('SELECT usuario_id, nombre, apellido, pass, rol FROM usuarios WHERE email = $1;',  [email])
    if (!user || user.length === 0) {throw new Error('Usuario no encontrado')}

    const storedPassword = user[0].pass

    if (!storedPassword) {
      throw new Error('Contraseña no encontrada en la base de datos')
    }

    const isMatch = await bcrypt.compare(password, storedPassword)

    if (!isMatch) {
      throw new Error('Credenciales inválidas')
    }

    console.log('✅ Usuario autenticado correctamente:', {
      usuario_id: user[0].usuario_id,
      nombre: user[0].nombre,
      apellido: user[0].apellido,
      rol: user[0].rol
    })

    return {
      usuario_id: user[0].usuario_id,
      nombre: user[0].nombre,
      apellido: user[0].apellido,
      rol: user[0].rol
    }
  } catch (error) {
    console.error('❌ Error en login:', error.message)
    throw new Error(error.message)
  }
}

// Obtener usuario por ID
const getUserById = async (usuario_id) => {
  try {
    const result = await db('SELECT usuario_id, nombre, apellido, email, rol FROM usuarios WHERE usuario_id = $1;', [usuario_id])
    if (!result || result.length === 0) { return null }
    return result[0]
  } catch (error) {
    console.error('❌ Error en getUserById:', error.message)
    throw new Error('Error al obtener el usuario')
  }
}

// Obtener todos los usuarios (Admin)
const getAllUsers = async () => {
  try {
    const result = await db('SELECT usuario_id, nombre, apellido, email, rol FROM usuarios;')

    return result
  } catch (error) {
    console.error('❌ Error en getAllUsers:', error.message)
    throw new Error('Error al obtener la lista de usuarios')
  }
}

// Actualizar usuario por ID
const updateUser = async (usuario_id, { nombre, apellido, email, pass, rol }) => {
  try {
    let query = 'UPDATE usuarios SET nombre = $1, apellido = $2, email = $3, rol = $4'
    const values = [nombre, apellido, email, rol]

    if (pass) {
      const hashedPassword = await bcrypt.hash(pass, 10)
      query += ', pass = $5 WHERE usuario_id = $6 RETURNING usuario_id, nombre, apellido, email, rol;'
      values.push(hashedPassword, usuario_id)
    } else {
      query += ' WHERE usuario_id = $5 RETURNING usuario_id, nombre, apellido, email, rol;'
      values.push(usuario_id)
    }

    const result = await db(query, values)

    if (!result || result.length === 0) {
      throw new Error('Error al actualizar el usuario')
    }

    return result[0]
  } catch (error) {
    console.error('❌ Error en updateUser:', error.message)
    throw new Error('Error al actualizar el usuario')
  }
}

// Eliminar usuario por ID
const deleteUser = async (usuario_id) => {
  try {
    const result = await db('DELETE FROM usuarios WHERE usuario_id = $1 RETURNING usuario_id;', [usuario_id])

    if (!result || result.length === 0) {
      throw new Error('Error al eliminar el usuario')
    }

    return result[0]
  } catch (error) {
    console.error('❌ Error en deleteUser:', error.message)
    throw new Error('Error al eliminar el usuario')
  }
}

module.exports = {
  register,
  login,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser
}


// const db = require('../database/db_connect.js')
// const bcrypt = require('bcrypt')

// // Función para registrar usuarios con contraseña encriptada
// const register = async ({ nombre, apellido, email, pass, rol }) => {
//   try {
//     console.log('🔹 Registrando usuario:', { nombre, apellido, email, rol })

//     const hashedPassword = await bcrypt.hash(pass, 10) // Encripta la contraseña antes de guardarla
//     console.log('🔐 Contraseña encriptada:', hashedPassword)

//     const result = await db(
//       'INSERT INTO usuarios (usuario_id, nombre, apellido, email, pass, rol) VALUES (DEFAULT, $1, $2, $3, $4, $5) RETURNING usuario_id, nombre, apellido, email, rol;',
//       [nombre, apellido, email, hashedPassword, rol]
//     )

//     if (!result || result.length === 0) {
//       throw new Error('Error al registrar el usuario')
//     }

//     console.log('✅ Usuario registrado con éxito:', result[0])
//     return result[0] // Devuelve el usuario recién registrado
//   } catch (error) {
//     console.error('❌ Error en register:', error.message)
//     throw new Error('Error al registrar el usuario')
//   }
// }

// // Función para login con verificación de contraseña encriptada
// const login = async ({ email, password }) => {
//   try {
//     if (!email || !password) {
//       throw new Error('Email y contraseña son obligatorios')
//     }

//     email = email.trim() // Evita errores por espacios en blanco
//     password = password.trim()

//     console.log('🔍 Iniciando sesión con:', { email, password })

//     const user = await db(
//       'SELECT usuario_id, nombre, apellido, pass, rol FROM usuarios WHERE email = $1;',
//       [email]
//     )

//     if (!user || user.length === 0) {
//       throw new Error('Usuario no encontrado')
//     }

//     const storedPassword = user[0].pass // Contraseña almacenada en la BD

//     console.log('🛠 Contraseña en BD:', storedPassword)
//     console.log('🔐 Contraseña ingresada:', password)

//     if (!storedPassword) {
//       throw new Error('Contraseña no encontrada en la base de datos')
//     }

//     const isMatch = await bcrypt.compare(password, storedPassword)

//     console.log('🔎 Comparación de contraseña:', isMatch ? '✅ Coincide' : '❌ No coincide')

//     if (!isMatch) {
//       throw new Error('Credenciales inválidas')
//     }

//     console.log('✅ Usuario autenticado correctamente:', {
//       usuario_id: user[0].usuario_id,
//       nombre: user[0].nombre,
//       apellido: user[0].apellido,
//       rol: user[0].rol
//     })

//     return {
//       usuario_id: user[0].usuario_id,
//       nombre: user[0].nombre,
//       apellido: user[0].apellido,
//       rol: user[0].rol
//     }
//   } catch (error) {
//     console.error('❌ Error en login:', error.message)
//     throw new Error(error.message)
//   }
// }

// module.exports = {
//   register,
//   login
// }
