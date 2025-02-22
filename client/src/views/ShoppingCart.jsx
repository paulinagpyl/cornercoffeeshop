import React, { useState, useContext } from 'react'
import { CoffeeContext } from '../store/CoffeeContext'
import { UserContext } from '../store/UserContext'

const ShoppingCart = () => {
  const { cart, totalCart, decreaseCount, increaseCount } = useContext(CoffeeContext)
  const { token, checkout } = useContext(UserContext)

  const [purchaseCompleted, setPurchaseCompleted] = useState(false)

  const handleCheckout = async () => {
    setPurchaseCompleted(true)

    const orderDetails = {
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.count,
        price: item.price
      })),
      total: totalCart
    }

    try {
      const response = await checkout(orderDetails)
      if (response) {
        console.log('¡CHECKOUT EXITOSO!')
      }
    } catch (error) {
      console.error('Error durante el checkout:', error)
      console.log('Checkout fallido. Intenta de nuevo.')
    }

    setTimeout(() => {
      setPurchaseCompleted(false)
    }, 5000)
  }

  return (
    <section className='h-100'>
      <div className='container h-100 py-5'>
        <div className='row d-flex justify-content-center align-items-center h-100'>
          <div className='col-10'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <h3 className='fw-normal mb-0'>Shopping Cart</h3>
            </div>

            {cart.length > 0
              ? (
                  cart.map((item, index) => (
                    <div key={item.id} className='card rounded-3 mb-4'>
                      <div className='card-body p-4'>
                        <div className='row d-flex justify-content-between align-items-center'>
                          <div className='col-md-2 col-lg-2 col-xl-2'>
                            <img
                              src={item.img}
                              className='img-fluid rounded-3'
                              alt={item.name}
                            />
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-3'>
                            <p className='lead fw-normal mb-2'>{item.name}</p>
                            <p>
                              <span className='text-muted'>Ingredients: </span>
                              {item.ingredients ? item.ingredients.join(', ') : 'N/A'}
                            </p>
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                            <button
                              className='btn btn-link px-2'
                              onClick={() => decreaseCount(index)}
                            >
                              -
                            </button>
                            <span className='form-control form-control-sm text-center' style={{ maxWidth: '50px' }}>
                              {item.count}
                            </span>
                            <button
                              className='btn btn-link px-2'
                              onClick={() => increaseCount(index)}
                            >
                              +
                            </button>
                          </div>
                          <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
                            <h5 className='mb-0'>${(item.price * item.count).toFixed(2)}</h5>
                          </div>
                          <div className='col-md-1 col-lg-1 col-xl-1 text-end'>
                            <button
                              className='btn btn-link'
                              onClick={() => decreaseCount(index)}
                            >
                              🗑 Eliminar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )
              : (
                <p>Tu carrito está vacío.</p>
                )}

            <div className='card'>
              <div className='card-body'>
                <h5 className='mb-0'>Precio Total: ${totalCart.toFixed(2)}</h5>
                <button
                  type='button'
                  className='btn btn-warning btn-block btn-lg mt-3'
                  onClick={handleCheckout}
                  disabled={!token || cart.length === 0}
                >
                  Proceder al Pago
                </button>

                {purchaseCompleted && (
                  <p className='text-success mt-3'>¡Compra realizada con éxito!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ShoppingCart
