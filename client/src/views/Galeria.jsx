import { useContext, useEffect } from 'react'
import { CoffeeContext } from '../store/CoffeeContext'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import '../css/CornerCoffeeShop.css'

const Galeria = () => {
  const { coffee, addCart } = useContext(CoffeeContext)
  const navigate = useNavigate()

  // Depuración: Ver los datos de café cuando se cargan
  useEffect(() => {}, [coffee])

  if (!coffee || coffee.length === 0) {
    return <div>Cargando...</div>
  }

  // Función para formatear los precios con separador de miles y sin decimales
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      minimumFractionDigits: 0
    }).format(price)
  }

  return (
    <div
      className='gallery p-3'
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        maxWidth: '1200px',
        margin: 'auto'
      }}
    >
      {coffee.map((coffee) => (
        <Card
          className='card'
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
          key={coffee.id}
        >
          <Card.Img className='photo' variant='top' src={coffee.img} />
          <Card.Body style={{ flexGrow: 1 }}>
            <Card.Title>
              {coffee.name.charAt(0).toUpperCase() + coffee.name.slice(1)}
            </Card.Title>
            <Card.Text>Precio: ${formatPrice(coffee.price)}</Card.Text>
            {/* <Card.Text>Descripción: {coffee.detalle}</Card.Text> */}
          </Card.Body>
          <div
            style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center',
              padding: '10px'
            }}
          >
            <Button
              variant='dark'
              style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
              onClick={() => {
                navigate(`/cafes/${coffee.id}`)
              }}
            >
              Ver detalle
            </Button>
            <Button
              variant='dark'
              style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
              onClick={() => {
                addCart(coffee)
              }}
            >
              Agregar al carrito
            </Button>
          </div>
        </Card>
      ))}
      <style>
        {`
          @media (max-width: 1024px) {
            .gallery {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 768px) {
            .gallery {
              grid-template-columns: repeat(1, 1fr);
            }
          }
        `}
      </style>
    </div>
  )
}

export default Galeria
