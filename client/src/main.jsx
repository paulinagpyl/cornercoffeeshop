import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import CoffeeProvider from './store/CoffeeContext.jsx'
import UserProvider from './store/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <React.StrictMode>
      <UserProvider>
        <CoffeeProvider>
          <App />
        </CoffeeProvider>
      </UserProvider>
    </React.StrictMode>
  </BrowserRouter>
)
