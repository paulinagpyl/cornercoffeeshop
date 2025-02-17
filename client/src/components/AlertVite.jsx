// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from 'prop-types'
import '../css/AlertVite.css'
import Alert from 'react-bootstrap/Alert'

// eslint-disable-next-line no-unused-vars
export const AlertVite = ({ color, msg, show, setShow }) => {
  return (
    <Alert
      className={`alert-custom alert-${color} ${!show ? 'hidden' : ''}`}
      show={show}
      variant={color}
    >
      <Alert.Heading className='alert-heading'>{color.toUpperCase()}</Alert.Heading>
      <p className='alert-body'>{msg}</p>
    </Alert>
  )
}

AlertVite.propTypes = {
  color: PropTypes.oneOf(['success', 'warning', 'danger', '']).isRequired,
  msg: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  setShow: PropTypes.func.isRequired
}
