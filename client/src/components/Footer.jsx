import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <footer className='text-light py-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <h5>Sobre nosotros</h5>
              <p>
                Somos una comunidad de amantes del café
              </p>
            </div>
            <div className='col-md-4'>
              <h5>Contact Us</h5>
              <ul className='list-unstyled'>
                <li>
                  <a href='mailto:info@cornercoffeeshopcom' className='text-light'>info@cornercoffeeshopcom</a>
                </li>
                <li>
                  <a href='tel:+1234567890' className='text-light'>+123 456 7890</a>
                </li>
              </ul>
            </div>
            <div className='col-md-4'>
              <h5>Follow Us</h5>
              <ul className='list-unstyled'>
                <li>
                  <a href='https://facebook.com' className='text-light' target='_blank' rel='noopener noreferrer'>
                    Facebook
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com' className='text-light' target='_blank' rel='noopener noreferrer'>
                    Twitter
                  </a>
                </li>
                <li>
                  <a href='https://instagram.com' className='text-light' target='_blank' rel='noopener noreferrer'>
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='text-center mt-4'>
            <p>&copy; {new Date().getFullYear()} Corner Coffee Shop ☕ . All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
