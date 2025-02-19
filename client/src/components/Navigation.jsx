import { useContext, useEffect } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
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
        <Nav className='ml-auto'>
          <Nav.Link as={NavLink} to='/catalogo' className={validateRoot}>
            Catálogo
          </Nav.Link>
          <Nav.Link as={NavLink} to='/registrarse' className={validateRoot}>
            Registrarse
          </Nav.Link>
          <Nav.Link as={NavLink} to='/login' className={validateRoot}>
            Iniciar Sesión
          </Nav.Link>
        </Nav>
      )
    }

    return (
      <Nav className='ml-auto'>
        <Nav.Link as={Link} to='/perfil' className='btn btn-light m-1'>
          Mi Perfil
        </Nav.Link>
        <Nav.Link as='button' onClick={logout} className='btn btn-danger'>
          Salir
        </Nav.Link>
      </Nav>
    )
  }

  return (
    <Navbar bg='light' expand='lg'>
      <Container>
        <Navbar.Brand as={Link} to='/'>
          ☕ Corner Coffee Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/'>
              Inicio
            </Nav.Link>
          </Nav>
          {isLogin()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation