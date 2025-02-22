import { useContext, useEffect } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { CoffeeContext } from '../store/CoffeeContext'
import '../css/CornerCoffeeShop.css'

const Navigation = () => {
  const navigate = useNavigate()
  const validateRoot = ({ isActive }) => (isActive ? 'activo' : 'noActivo')
  const { getDeveloper, setDeveloper, totalCart } = useContext(CoffeeContext)

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

  return (
    <Navbar bg='dark' expand='lg' className='navbar navbar-expand-sm navbar-light'>
      <Container>
        <Navbar.Brand as={Link} to='/' className='text-light'>
          ☕ Corner Coffee Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={NavLink} to='/' className={`text-light ${validateRoot({ isActive: true })}`}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to='/catalogo' className={`text-light ${validateRoot({ isActive: true })}`}>
              Catálogo
            </Nav.Link>
            <Nav.Link as={NavLink} to='/cart' className='text-light' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
              🛒 Carrito ({totalCart.toFixed(2)})
            </Nav.Link>
          </Nav>

          <Nav className='ml-auto'>
            {getDeveloper
              ? (
                <>
                  <Nav.Link as={Link} to='/profile' className='btn btn-light m-1'>
                    🔓 Mi Perfil
                  </Nav.Link>
                  <Nav.Link as='button' onClick={logout} className='btn btn-danger'>
                    🔒 Salir
                  </Nav.Link>
                </>
                )
              : (
                <>
                  <Nav.Link as={NavLink} to='/login' className='text-light'>
                    🔐 Iniciar Sesión
                  </Nav.Link>
                  <Nav.Link as={NavLink} to='/registrarse' className='text-light'>
                    🔐 Registrarse
                  </Nav.Link>
                </>
                )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation
