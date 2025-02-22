import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/CornerCoffeeShop.css'

export const Footer = () => {
  return (
    <div className='footer'>
      <footer className='text-light py-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-4'>
              <h5>About Us</h5>
              <p>
                Somos una comunidad de amantes del café
              </p>
            </div>
            <div className='col-md-4'>
              <h5>Contact Us</h5>
              <ul className='list-unstyled'>
                <li>
                  <a href='mailto:info@cornercoffeeshopcom' className='text-light'>info@cornercoffeeshop.com</a>
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
                    Facebook <i className='fab fa-facebook-f'></i>
                  </a>
                </li>
                <li>
                  <a href='https://twitter.com' className='text-light' target='_blank' rel='noopener noreferrer'>
                    Twitter <i className='fab fa-twitter'></i>
                  </a>
                </li>
                <li>
                  <a href='https://instagram.com' className='text-light' target='_blank' rel='noopener noreferrer'>
                    Instagram <i className='fab fa-instagram'></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='text-center mt-4'>
            <p>&copy; {new Date().getFullYear()} Corner Coffee Shop ☕. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
