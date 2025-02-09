import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import CoffeeProvider from './store/CoffeeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CoffeeProvider>
      <App />
    </CoffeeProvider>
  </React.StrictMode>
)
