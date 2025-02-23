import { createContext, useEffect, useState } from 'react'

export const CoffeeContext = createContext()

const CoffeeProvider = ({ children }) => {
  const [coffee, setCoffee] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getCoffeeFromDB = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos')
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

  const increaseCount = (index) => {
    cart[index].count++
    setCart([...cart])
  }

  const decreaseCount = (index) => {
    if (cart[index].count === 1) {
      cart.splice(index, 1)
    } else {
      cart[index].count--
    }
    setCart([...cart])
  }

  const totalCart = cart.reduce((accum, { price, count }) => accum + price * count, 0)

  const globalState = {
    coffee,
    cart,
    setCart,
    addCart,
    decreaseCount,
    increaseCount,
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
