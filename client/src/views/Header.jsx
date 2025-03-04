/* eslint-disable multiline-ternary */
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../store/UserContext'

const Header = () => {
  const navigate = useNavigate()
  const { token } = useContext(UserContext)

  const irAlCatalogo = () => {
    navigate('/catalogo')
  }

  const irALogin = () => {
    navigate('/login')
  }

  const irAlPerfil = () => {
    navigate('/profile')
  }

  return (
    <div>
      <header
        id='Hero-Section'
        className='text-end py-5'
        style={{
          color: '#000', // Default text color
          '@media (max-width: 768px)': {
            color: '#bbb' // Light text color on smaller screens
          }
        }}
      >
        <div className='containerHome'>
          <div className='ms-auto col-12 col-md-7'>
            <h1
              className='display-4 fw-bold my-5 title-coffee'
              style={{
                '@media (max-width: 768px)': {
                  color: '#ccc'
                }
              }}
            >
              Corner Coffee Shop <br /> <span>Amantes del café</span>
            </h1>
            <p
              className='my-5 quote-coffee'
              style={{
                '@media (max-width: 768px)': {
                  color: '#ddd'
                }
              }}
            >
              “No hay nada como una taza de café para estimular las células del cerebro.”
              <br />
              <strong>— Sherlock Holmes</strong>
            </p>
            <div className='mb-5 pb-5'>
              {token ? (
                <>
                  <button
                    className='btn btn-lg btn-brown'
                    onClick={irAlPerfil}
                    style={{
                      minWidth: '150px',
                      minHeight: '45px',
                      transition: 'none'
                    }}
                  >
                    Ir a Perfil
                  </button>
                  <button
                    className='btn btn-lg btn-outline-brown me-4'
                    onClick={irAlCatalogo}
                    style={{
                      minWidth: '150px',
                      minHeight: '45px',
                      transition: 'none'
                    }}
                  >
                    Catálogo
                  </button>
                </>
              ) : (
                <>
                  <button
                    className='btn btn-lg btn-brown'
                    onClick={irALogin}
                    style={{
                      minWidth: '150px',
                      minHeight: '45px',
                      transition: 'none'
                    }}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    className='btn btn-lg btn-outline-brown me-4'
                    onClick={irAlCatalogo}
                    style={{
                      minWidth: '150px',
                      minHeight: '45px',
                      transition: 'none'
                    }}
                  >
                    Catálogo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
