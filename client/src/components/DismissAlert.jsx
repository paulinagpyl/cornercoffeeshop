import { useState, useContext } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import { UserContext } from '../store/UserContext'
import { useNavigate } from 'react-router-dom'

function AlertDismissible () {
  const [show, setShow] = useState(true)
  const { logout } = useContext(UserContext) // Asumiendo que tienes un método logout en UserContext
  const navigate = useNavigate() // Para redirigir al catálogo

  const handleLogout = () => {
    logout() // Llamar a logout para borrar el token y cualquier otra información
    setShow(false) // Ocultar la alerta
    navigate('/') // Redirigir al inicio o al login
  }

  const handleContinueShopping = () => {
    setShow(false) // Ocultar la alerta
    navigate('/catalogo') // Redirigir al catálogo
  }

  return (
    <>
      <Alert show={show} variant='success'>
        <Alert.Heading>¿Deseas cerrar sesión o continuar comprando?</Alert.Heading>
        <p>
          Elige una opción:
        </p>
        <hr />
        <div className='d-flex justify-content-end'>
          <Button onClick={handleLogout} variant='outline-danger' className='me-2'>
            Cerrar sesión
          </Button>
          <Button onClick={handleContinueShopping} variant='outline-success'>
            Continuar comprando
          </Button>
        </div>
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Mostrar Alerta</Button>}
    </>
  )
}

export default AlertDismissible
