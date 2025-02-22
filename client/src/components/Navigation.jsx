import { useContext } from 'react'
import { Link, useNavigate, NavLink } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { UserContext } from '../store/UserContext'
import { CoffeeContext } from '../store/CoffeeContext'
import '../css/CornerCoffeeShop.css'

const Navigation = () => {
  const navigate = useNavigate()
  const { profile, logout } = useContext(UserContext) // Usa UserContext para autenticación
  const { totalCart } = useContext(CoffeeContext) // Usa CoffeeContext para el carrito

  return (
    <Navbar bg='coffee' expand='lg' className='navbar navbar-expand-sm navbar-light'>
      <Container className='d-flex justify-content-between align-items-center'>
        {/* Botón principal: Ir a Inicio */}
        <Navbar.Brand as={Link} to='/' className='text-light'>
          ☕ Corner Coffee Shop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls='navbar-nav' />
        <Navbar.Collapse id='navbar-nav' className='justify-content-center'>
          <Nav>
            {profile
              ? (
                <>
                  <Nav.Link as={Link} to='/profile' className='btn btn-light m-1'>
                    🔓 Mi Perfil
                  </Nav.Link>
                  <Nav.Link as='button' onClick={() => { logout(); navigate('/'); }} className='btn btn-danger'>
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

        {/* Carrito Total (siempre a la izquierda) */}
        <Nav>
          <Nav.Link as={NavLink} to='/cart' className='text-light' style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
            🛒 Carrito ({totalCart.toFixed(2)})
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Navigation
