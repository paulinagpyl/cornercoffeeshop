import { createContext, useState, useCallback } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [email, setEmail] = useState(null)
  const [profile, setProfile] = useState(null)

  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
    setProfile(null)
  }

  const getProfile = useCallback(async () => {
    if (!token) return // Evita hacer la petición si no hay token

    try {
      const response = await fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      const data = await response.json()
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }, [token]) // Se ejecuta solo cuando `token` cambia

  const checkout = async (orderDetails) => {
    try {
      const response = await fetch('http://localhost:5000/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(orderDetails)
      })

      if (!response.ok) {
        throw new Error('Checkout failed')
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error during checkout:', error)
    }
  }

  return (
    <UserContext.Provider value={{
      token,
      email,
      profile,
      login,
      register,
      logout,
      getProfile,
      checkout
    }}
    >
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider
