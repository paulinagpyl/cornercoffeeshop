import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../store/UserContext'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmPassword: '',
  rol: 'usuario'
}

const Register = () => {
  const navigate = useNavigate()
  const { register } = useContext(UserContext)
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) =>
    setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = async (event) => {
    event.preventDefault()

    // Validaciones
    if (!user.nombre.trim() || !user.apellido.trim() || !user.email.trim() || !user.password.trim() || !user.confirmPassword.trim()) {
      return window.alert('⚠️ Todos los campos son obligatorios.')
    }
    if (!emailRegex.test(user.email)) {
      return window.alert('⚠️ El formato del email no es correcto.')
    }
    if (user.password !== user.confirmPassword) {
      return window.alert('⚠️ Las contraseñas no coinciden.')
    }

    try {
      await register(user.nombre, user.apellido, user.email, user.password, user.rol)
      window.alert('🎉 Usuario registrado con éxito.')
      navigate('/login')
    } catch (error) {
      console.error('❌ Error en el registro:', error)
      window.alert('🚫 Error en el registro.')
    }
  }

  useEffect(() => {
    if (window.sessionStorage.getItem('token')) {
      navigate('/perfil')
    }
  }, [])

  return (
    <form onSubmit={handleForm} className='col-10 col-sm-6 col-md-3 m-auto mt-5 App'>
      <h1>Registrar nuevo usuario</h1>
      <hr />
      <div className='form-group mt-1'>
        <label>Nombre</label>
        <input value={user.nombre} onChange={handleUser} type='text' name='nombre' className='form-control' placeholder='Ingrese su nombre' />
      </div>
      <div className='form-group mt-1'>
        <label>Apellido</label>
        <input value={user.apellido} onChange={handleUser} type='text' name='apellido' className='form-control' placeholder='Ingrese su apellido' />
      </div>
      <div className='form-group mt-1'>
        <label>Email</label>
        <input value={user.email} onChange={handleUser} type='email' name='email' className='form-control' placeholder='Ingrese su email' />
      </div>
      <div className='form-group mt-1'>
        <label>Contraseña</label>
        <input value={user.password} onChange={handleUser} type='password' name='password' className='form-control' placeholder='Ingrese su contraseña' />
      </div>
      <div className='form-group mt-1'>
        <label>Confirmar Contraseña</label>
        <input value={user.confirmPassword} onChange={handleUser} type='password' name='confirmPassword' className='form-control' placeholder='Confirme su contraseña' />
      </div>
      <button type='submit' className='btn btn-light mt-3'>Registrarme</button>
    </form>
  )
}

export default Register
