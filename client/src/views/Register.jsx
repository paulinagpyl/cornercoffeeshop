import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ENDPOINT } from '../config/constans'

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
const initialForm = {
  nombre: '',
  apellido: '',
  email: '',
  pass: '',
  rol: 'usuario'
}

const Register = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(initialForm)

  const handleUser = (event) => setUser({ ...user, [event.target.name]: event.target.value })

  const handleForm = (event) => {
    event.preventDefault() // evita que se precargue el formulario de nuevo

    // if (!user.nombre.trim() || !user.apellido.trim() || !user.email.trim() || !user.pass.trim() || user.rol === 'Seleccione un rol' )
    if (!user.nombre.trim() || !user.apellido.trim() || !user.email.trim() || !user.pass.trim()) {
      return window.alert('Todos los campos son obligatorios.')
    }
    if (!emailRegex.test(user.email)) { return window.alert('El formato del email no es correcto!') }

    axios.post(ENDPOINT.users, user)
      .then(() => {
        window.alert('Usuario registrado con éxito 😀.')
        navigate('/login')
      })
      .catch(({ response: { data } }) => {
        console.error(data)
        window.alert(`${data.message} 🙁.`)
      })
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
      <div className='form-group mt-1 '>
        <label>Nombre</label>
        <input
          value={user.nombre}
          onChange={handleUser}
          type='text'
          name='nombre'
          className='form-control'
          placeholder='Enter nombre'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Apellido</label>
        <input
          value={user.apellido}
          onChange={handleUser}
          type='text'
          name='apellido'
          className='form-control'
          placeholder='Enter apellido'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Email</label>
        <input
          value={user.email}
          onChange={handleUser}
          type='email'
          name='email'
          className='form-control'
          placeholder='Enter email'
        />
      </div>
      <div className='form-group mt-1 '>
        <label>Contraseña</label>
        <input
          value={user.pass}
          onChange={handleUser}
          type='password'
          name='pass'
          className='form-control'
          placeholder='Password'
        />
      </div>
      {/* <div className='form-group mt-1 '>
        <label>Rol</label>
        <select
          defaultValue={user.rol}
          onChange={handleUser}
          name='rol'
          className='form-select'
        >
          <option disabled>Seleccione un rol</option>
          <option value='admin'>Administrador</option>
          <option value='usuario'>Cliente</option>
        </select>
      </div> */}
      <button type='submit' className='btn btn-light mt-3'>Registrarme</button>
    </form>
  )
}

export default Register
