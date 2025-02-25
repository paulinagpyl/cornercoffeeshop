import { createContext, useEffect, useState } from 'react'

export const SERVER_URL = import.meta.env.VITE_URLBASE
export const CoffeeContext = createContext()

const CoffeeProvider = ({ children }) => {
  const [coffee, setCoffee] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getCoffeeFromDB = async () => {
      try {
        const response = await fetch(`${SERVER_URL}/productos`)
        const data = await response.json()

        if (data.status) {
          const formattedCoffees = data.message.map((item) => ({
            id: item.producto_id,
            img: item.imagen_url,
            name: item.nombre,
            detalle: item.descripcion,
            price: parseFloat(item.precio)
          }))
          setCoffee(formattedCoffees)
        } else {
          console.error('Error al cargar los cafés desde la base de datos')
        }
      } catch (error) {
        console.error('Error al obtener los cafés:', error)
      }
    }

    getCoffeeFromDB()
  }, [])

  const setDeveloper = (develop) => setUser(develop)

  const addCart = (coffeeItem) => {
    const foundCoffee = cart.findIndex((cartCoffee) => cartCoffee.id === coffeeItem.id)
    if (foundCoffee < 0) {
      coffeeItem.count = 1
      setCart([...cart, coffeeItem])
    } else {
      cart[foundCoffee].count++
      setCart([...cart])
    }
  }

  const increaseCount = (id) => {
    const updateCart = cart.map((item) =>
      item.id === id ? {...item,count:item.count +1} :item
    )
    setCart(updateCart)
  }

  const decreaseCount = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id ? { ...item, count: item.count - 1 } : item
      )
      .filter((item) => item.count > 0); // Elimina productos con count = 0
    setCart(updatedCart)
  }

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart)
  }

  const totalCart = cart.reduce((accum, { price, count }) => accum + price * count, 0)

  const globalState = {
    coffee,
    cart,
    setCart,
    addCart,
    decreaseCount,
    increaseCount,
    removeItem,
    totalCart,
    getDeveloper: user,
    setDeveloper
  }

  return (
    <CoffeeContext.Provider value={globalState}>
      {children}
    </CoffeeContext.Provider>
  )
}

export default CoffeeProvider
