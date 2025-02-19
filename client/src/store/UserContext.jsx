import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState([])
  const [email, setEmail] = useState([])
  const [profile, setProfile] = useState(null)

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      setToken(data.token)
      setEmail(data.email)
    } catch (error) {
      console.error('Error during login:', error)
    }
  }

  const register = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      const data = await response.json()
      setToken(data.token)
      setEmail(data.email)
    } catch (error) {
      console.error('Error during registration:', error)
    }
  }

  const logout = () => {
    setToken(null)
    setEmail(null)
    setProfile(null) // Limpiar el perfil del estado al hacer logout
  }

  const getProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Enviar el token JWT en el header
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setProfile(data) // Almacenar los datos del perfil en el estado
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const checkout = async (orderDetails) => {
    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` // Enviar el token JWT en el header
        },
        body: JSON.stringify(orderDetails)
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const data = await response.json()
      return data // Retornar los datos de respuesta del checkout
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  return (
    <UserContext.Provider value={{
      token,
      email,
      profile, // Exponer el perfil en el contexto
      login,
      register,
      logout,
      getProfile, // Añadir el método getProfile al contexto
      checkout // Añadir el método checkout al contexto
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
