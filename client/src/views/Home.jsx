import axios from 'axios'
// import Context from "../store/_Context";
import { useContext, useEffect } from 'react'
import { ENDPOINT } from '../config/constans'
import { CoffeeContext } from '../store/CoffeeContext'
import Galeria from './Galeria'
// import Gallery from './Gallery'

const Home = () => {
  const { setDeveloper } = useContext(CoffeeContext)

  const getDeveloperData = () => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
      axios
        .get(ENDPOINT.users, { headers: { Authorization: `Bearer ${token}` } })
        .then(({ data: [user] }) => setDeveloper({ ...user }))
        .catch(() => {
          window.sessionStorage.removeItem('token')
          setDeveloper(null)
        })
    }
  }

  useEffect(getDeveloperData, [])

  return (
    <div>
      <div className='App'>
        <h1>El arte de un buen café</h1>
        <h3>comienza aquí</h3>
        <Galeria />
      </div>
    </div>
  )
}

export default Home
