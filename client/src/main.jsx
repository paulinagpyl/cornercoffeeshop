import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import CoffeeProvider from './store/CoffeeContext.jsx' // Cambio aquí nuevamente
import UserProvider from './store/UserContext.jsx'
import CartProvider from './store/CartContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <React.StrictMode>
      <CartProvider>
        <UserProvider>
          <CoffeeProvider>
            <App />
          </CoffeeProvider>
        </UserProvider>
      </CartProvider>
    </React.StrictMode>
  </BrowserRouter>
)
