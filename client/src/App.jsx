import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './views/Home'
import Registro from './views/Register'
import Login from './views/Login'
import Perfil from './views/Profile'
import CoffeeDetail from './views/CoffeeDetail'
import NotFound from './views/NotFound'
import Galeria from './views/Galeria'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route
          path='/'
          element={<Home />}
        />
        <Route
          path='/catalogo'
          element={<Galeria />}
        />
        <Route
          path='/registrarse'
          element={<Registro />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
        <Route
          path='/perfil'
          element={<Perfil />}
        />
        <Route
          path='/*'
          element={<NotFound />}
        />
        <Route
          path='/plantas/:id'
          element={<CoffeeDetail />}
        />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
