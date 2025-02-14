import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CoffeeContext } from '../store/CoffeeContext'
import { Button, Card } from 'react-bootstrap'

const CoffeeDetail = () => {
  // eslint-disable-next-line no-unused-vars
  const { coffee, addCart } = useContext(CoffeeContext)
  const { id } = useParams()
  const [coffeeData, setCoffeeData] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (coffee.length > 0) {
      const foundCoffee = coffee.find((coffee) => String(coffee.id) === id)
      setCoffeeData(foundCoffee)
    }
  }, [id, coffee])

  if (!coffeeData) {
    return <div>Cargando...</div>
  }

  return (
    <div className='planta-detalle-container p-3'>
      <Card className='card detalle-card' style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'row', margin: '0 auto' }}>
        {/* Imagen del producto */}
        <Card.Img className='photo' variant='top' src={coffeeData.img} style={{ width: '40%', objectFit: 'cover' }} />

        {/* Detalles del producto */}
        <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
          <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {coffeeData.name.charAt(0).toUpperCase() + coffeeData.name.slice(1)}
          </Card.Title>
          <Card.Text style={{ marginBottom: '15px' }}>
            <strong>Detalle:</strong> {coffeeData.detalle}
          </Card.Text>
          <Card.Text style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
            <strong>Precio:</strong> {coffeeData.price}
          </Card.Text>

          {/* Botón para añadir al carrito */}
          <Button
            variant='dark'
            style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
            // onClick={() => addCart(coffeeData)}>
            onClick={() => navigate('/catalogo')}
          >
            Volver al Catálogo
          </Button>
          <Button
              variant='dark'
              style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
              onClick={() => {
                console.log('Café agregado al carrito:', coffee.name)
                addCart(coffee)
              }}
            >
              Agregar al carrito
            </Button>
          {/* <Button
            variant='dark'
            style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
            onClick={() => addCart(coffeeData)}
          >
            agregar
          </Button> */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default CoffeeDetail
