import { useContext, useEffect } from 'react'
import { CoffeeContext } from '../store/CoffeeContext'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

const Galeria = () => {
  const { coffee, addCart } = useContext(CoffeeContext)
  const navigate = useNavigate()

  // Depuración: Ver los datos de plantas cuando se cargan
  useEffect(() => {

  }, [coffee])

  if (!coffee || coffee.length === 0) {
    return <div>Cargando...</div>
  }

  return (
    <div className='gallery grid-columns-4 p-3'>
      {coffee.map((planta) => (
        <Card className='card' style={{ width: '18rem', display: 'flex', flexDirection: 'column', height: '100%' }} key={planta.id}>
          <Card.Img className='photo' variant='top' src={planta.img} />
          <Card.Body style={{ flexGrow: 1 }}>
            <Card.Title>
              {coffee.name.charAt(0).toUpperCase() + coffee.name.slice(1)}
            </Card.Title>
            <Card.Text>Precio: {coffee.price}</Card.Text>
            {/* <Card.Text>Descripción: {planta.detalle}</Card.Text> */}
          </Card.Body>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', padding: '10px' }}>
            <Button
              variant='dark'
              style={{ backgroundColor: '#8B4513', borderColor: '#8B4513' }}
              onClick={() => {
                console.log('ID de café seleccionado:', coffee.id)
                navigate(`/plantas/${coffee.id}`)
              }}
            >
              Ver detalle
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default Galeria
