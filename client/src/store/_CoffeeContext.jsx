import { createContext, useEffect, useState } from 'react'

export const CoffeeContext = createContext()

const CoffeeProvider = ({ children }) => {
  const [coffee, setCoffee] = useState([])
  const [cart, setCart] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getCoffee = async () => {
      try {
        const response = await fetch('http://localhost:5173/utils/coffees.json')
        const data = await response.json()

        setCoffee(data)
      } catch (error) {
        console.error('Error al requerir café:', error)
      }
    }
    getCoffee()
  }, [])

  const setDeveloper = (develop) => setUser(develop)

  const addCart = (coffee) => {
    const foundCoffee = cart.findIndex((cartCoffee) => cartCoffee.id === coffee.id)
    if (foundCoffee < 0) {
      coffee.count = 1
      setCart([...cart, coffee])
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

  const totalCart = cart.reduce(
    (acumulador, { price, count }) => acumulador + price * count, 0
  )

  // const globalState = { plantas,cart,setCart,addCart,decreaseCount, increaseCount, totalCart};
  const globalState = { coffee, cart, setCart, addCart, decreaseCount, increaseCount, totalCart, getDeveloper: user, setDeveloper }

  return (
    <CoffeeContext.Provider value={globalState}>
      {children}
    </CoffeeContext.Provider>
  )
}

export default CoffeeProvider
