import { useContext } from 'react'
import { CoffeeContext } from '../store/CoffeeContext'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import '../css/CornerCoffeeShop.css'

const Galeria = () => {
  const { coffee, addCart } = useContext(CoffeeContext)
  const navigate = useNavigate()

  if (!coffee || coffee.length === 0) {
    return <div>Cargando...</div>
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', { minimumFractionDigits: 0 }).format(
      price
    )
  }

  return (
    <div className='gallery p-3'>
      {coffee.map((coffee) => (
        <Card className='card' key={coffee.id}>
          <Card.Img className='photo' variant='top' src={coffee.img} />
          <Card.Body className='card-body'>
            <Card.Title>
              {coffee.name.charAt(0).toUpperCase() + coffee.name.slice(1)}
            </Card.Title>
            <Card.Text>Precio: ${formatPrice(coffee.price)}</Card.Text>
          </Card.Body>
          <div className='card-footer'>
            <Button
              className='btn-brown'
              onClick={() => navigate(`/cafes/${coffee.id}`)}
            >
              Ver detalle
            </Button>
            <Button className='btn-brown' onClick={() => addCart(coffee)}>
              Agregar al carrito
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Galeria
