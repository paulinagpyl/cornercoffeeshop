import React from 'react'
import '../css/Header.css'

const Header = () => {
  return (
    <div>
      <header id='Hero-Section' className='text-light text-end py-5 mt-5'>
        <div className='container'>
          <div className='ms-auto col-12 col-md-7'>
            <h1 className='display-4 fw-bold my-5 text-light'>
              Corner Coffee Shop <br /> <span>Amantes del café</span>
            </h1>
            <p className='my-5 text-light fw-bold'>
              “No hay nada como una taza de café para estimular las células del cerebro.”
              <br />
              <strong>— Sherlock Holmes</strong>
            </p>
            <div className='mb-5 pb-5'>
              <button className='btn btn-lg btn-outline-secondary me-4'>
                Catálogo
              </button>
              <button className='btn btn-lg btn-secondary text-light'>
                Contacto
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
