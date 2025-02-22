import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../store/UserContext'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = { email: '', password: '' }

const Login = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)
  const { login } = useContext(UserContext)

  // Maneja los cambios en los inputs
  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value })

  // Manejo del formulario
  const handleForm = async (event) => {
    event.preventDefault()

    // Validaciones básicas
    if (!user.email.trim() || !user.password.trim()) {
      return window.alert('⚠️ Email y contraseña son obligatorios.')
    }
    if (!emailRegex.test(user.email)) {
      return window.alert('⚠️ El formato del email no es válido.')
    }

    try {
      await login(user.email, user.password) // Llamamos al contexto

      window.alert('🎉 Usuario identificado con éxito.')
      navigate('/profile') // Redirige al perfil
    } catch (error) {
      console.error('❌ Error en la autenticación:', error)
      window.alert('🚫 Error en el inicio de sesión.')
    }
  }

  return (
    <form
      onSubmit={handleForm}
      className='col-10 col-sm-6 col-md-3 m-auto mt-5 App'
    >
      <h1>Iniciar Sesión</h1>
      <hr />
      <div className='form-group mt-1'>
        <label>Email</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
          required
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Contraseña</label>
        <input
          value={user.password}
          onChange={handleUser}
          type='password'
          name='password'
          className='form-control'
          placeholder='Password'
          required
        />
      </div>
      <button type='submit' className='btn btn-light mt-3 app'>
        Iniciar Sesión
      </button>
    </form>
  )
}

export default Login
