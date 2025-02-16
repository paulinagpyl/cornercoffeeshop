import React, { useState, useContext } from 'react'
import { useCart } from '../context/CartContext'
import { UserContext } from '../store/UserContext+'
import '../css/ButtonsVite.css'

export const ShoppingCart = () => {
  const { cart, totalPrice, removeFromCart, addToCart } = useCart()
  const { token, checkout } = useContext(UserContext)

  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1
      return acc
    }, {})
  )
  const [purchaseCompleted, setPurchaseCompleted] = useState(false)

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: quantity
      }))
    }
  }

  const handleUpdateCart = (item) => {
    const quantity = quantities[item.id] || 1
    for (let i = 0; i < quantity - item.quantity; i++) {
      addToCart(item)
    }
    for (let i = 0; i < item.quantity - quantity; i++) {
      removeFromCart(item.id)
    }
  }

  const handleCheckout = async () => {
    setPurchaseCompleted(true)

    const orderDetails = {
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: quantities[item.id] || 1,
        price: item.price
      })),
      total: totalPrice
    }

    try {
      const response = await checkout(orderDetails)
      if (response) {
        console.log('¡CHECKOUT EXITOSO!')
      }
    } catch (error) {
      console.error('Error during checkout:', error)
      console.log('Checkout failed. Please try again.')
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
                  cart.map((item) => (
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
                              {item.ingredients.join(', ')}
                            </p>
                          </div>
                          <div className='col-md-3 col-lg-3 col-xl-2 d-flex'>
                            <button
                              className='btn btn-link px-2'
                              onClick={() =>
                                handleQuantityChange(item.id, quantities[item.id] - 1)}
                            >
                              -
                            </button>
                            <input
                              type='number'
                              min='1'
                              value={quantities[item.id] || 1}
                              onChange={(e) =>
                                handleQuantityChange(item.id, parseInt(e.target.value))}
                              className='form-control form-control-sm text-center'
                              style={{ maxWidth: '50px' }}
                            />
                            <button
                              className='btn btn-link px-2'
                              onClick={() =>
                                handleQuantityChange(item.id, quantities[item.id] + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className='col-md-3 col-lg-2 col-xl-2 offset-lg-1'>
                            <h5 className='mb-0'>
                              ${(item.price * (quantities[item.id] || 1)).toFixed(2)}
                            </h5>
                          </div>
                          <div className='col-md-1 col-lg-1 col-xl-1 text-end'>
                            <button
                              className='btn btn-link'
                              onClick={() => removeFromCart(item.id)}
                            >
                              🗑 Eliminar
                            </button>
                          </div>
                        </div>
                        <button
                          className='btn btn-outline-primary mt-2'
                          onClick={() => handleUpdateCart(item)}
                        >
                          Update Cart
                        </button>
                      </div>
                    </div>
                  ))
                )
              : (
                <p>Your cart is empty.</p>
                )}

            <div className='card'>
              <div className='card-body'>
                <h5 className='mb-0'>Total Price: ${totalPrice.toFixed(2)}</h5>
                <button
                  type='button'
                  className='btn btn-warning btn-block btn-lg mt-3'
                  onClick={handleCheckout}
                  disabled={!token || cart.length === 0}
                >
                  Proceed to Pay
                </button>

                {purchaseCompleted && (
                  <p className='text-success mt-3'>Purchase completed!</p>
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
