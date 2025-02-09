import { useContext, useEffect } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { Container, Nav } from 'react-bootstrap'

// import Context from "../store/_Context";
// import { Context } from '../store/PlantaContext'
import { CoffeeContext } from '../store/CoffeeContext'

const Navigation = () => {
  const navigate = useNavigate()
  const validateRoot = ({ isActive }) => (isActive ? 'activo' : 'noActivo')
  const { getDeveloper, setDeveloper } = useContext(CoffeeContext)

  useEffect(() => {
    const token = window.sessionStorage.getItem('token')
    if (token && !getDeveloper) {
      const userData = {
        name: 'Usuario Name',
        email: 'usuario@example.com'
      } // Simula datos de usuario
      setDeveloper(userData)
    }
  }, [getDeveloper, setDeveloper])

  const logout = () => {
    setDeveloper(null) // Limpia el estado del usuario
    window.sessionStorage.removeItem('token') // Remueve token usuario
    navigate('/') // Devuelve a home
  }

  const isLogin = () => {
    if (!getDeveloper) {
      return (
        <Container>
          <Nav className='navbar'>
            <div>
              <NavLink to='/catalogo' className={validateRoot}>
                Catalogo
              </NavLink>
            </div>
            <div>
              <NavLink to='/registrarse' className={validateRoot}>
                {' '}
                Registrarse
              </NavLink>
              <NavLink to='/login' className={validateRoot}>
                Iniciar Sesión
              </NavLink>
            </div>
          </Nav>
        </Container>
      )
    }

    return (
      <>
        <Link to='/perfil' className='btn m-1 btn-light'>
          Mi Perfil
        </Link>
        <button onClick={logout} className='btn btn-danger'>
          Salir
        </button>
      </>
    )
  }

  return (
    <nav className='navbar'>
      <span className='logo'> ☕Corner Coffee Shop</span>
      <div className='opciones'>
        <span className='me-3'>
          <Link to='/'> Inicio </Link>
        </span>
        {isLogin()}
      </div>
    </nav>
  )
}

export default Navigation
