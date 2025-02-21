import axios from 'axios'
import { CoffeeContext } from '../store/CoffeeContext'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const Profile = () => {
  const navigate = useNavigate()
  const { user, setDeveloper } = useContext(CoffeeContext) // ⬅️ Corrección: `user` en lugar de `getDeveloper`

  const getDeveloperData = async () => {
    try {
      const token = window.sessionStorage.getItem('token')
      if (!token) {
        console.warn('🚨 No hay token, redirigiendo a /login')
        navigate('/login')
        return
      }

      const { data } = await axios.get(ENDPOINT.users, {
        headers: { Authorization: `Bearer ${token}` }
      })

      console.log('✅ Usuario autenticado:', data)
      setDeveloper(data) // ⬅️ Guarda el usuario en el contexto
    } catch (error) {
      console.error('❌ Error obteniendo el usuario:', error.response?.data || error.message)
      window.sessionStorage.removeItem('token')
      setDeveloper(null)
      navigate('/')
    }
  }

  useEffect(() => {
    getDeveloperData()
  }, []) // ⬅️ Se ejecuta solo una vez al montar el componente

  return (
    <div className='App'>
      <h1>Bienvenid@ {user ? user.nombre : 'a tu cuenta de publicaciones'}</h1>
    </div>
  )
}

export default Profile
