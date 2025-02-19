import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Header.css'

const Header = () => {
  const navigate = useNavigate()

  const irAlCatalogo = () => {
    navigate('/catalogo')
  }

  const irALogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <header id='Hero-Section' className='text-end py-5'>
        <div className='container'>
          <div className='ms-auto col-12 col-md-7'>
            <h1 className='display-4 fw-bold my-5 title-coffee'>
              Corner Coffee Shop <br /> <span>Amantes del café</span>
            </h1>
            <p className='my-5 quote-coffee'>
              “No hay nada como una taza de café para estimular las células del cerebro.”
              <br />
              <strong>— Sherlock Holmes</strong>
            </p>
            <div className='mb-5 pb-5'>
              <button className='btn btn-lg btn-brown' onClick={irALogin}>
                Iniciar Sesión
              </button>
              <button className='btn btn-lg btn-outline-brown me-4' onClick={irAlCatalogo}>
                Catálogo
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
