/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { AlertVite } from './AlertVite'

const Register = ({ handleOnChange, handleOnSubmit }) => {
  return (
    <div className='form2'>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className='mb-3' controlId='formViteName'>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type='text'
            name='name'
            placeholder='Enter your Name'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formViteUsername'>
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type='text'
            name='username'
            placeholder='Enter your username'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formViteEmail'>
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type='email'
            name='email'
            placeholder='Enter your email'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formVitePassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type='password'
            name='password'
            placeholder='Password'
          />
        </Form.Group>

        <Form.Group className='mb-3' controlId='formVitePasswordRepeat'>
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            onChange={handleOnChange}
            type='password'
            name='repeatPassword'
            placeholder='Repeat Password'
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </div>
  )
}

Register.propTypes = {
  handleOnChange: PropTypes.func.isRequired,
  handleOnSubmit: PropTypes.func.isRequired
}

const FormParent = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    repeatPassword: ''
  })

  const [formStatus, setFormStatus] = useState({
    color: '',
    msg: ''
  })

  const [showAlert, setShowAlert] = useState(false)

  const handleOnChange = (event) => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const { name, username, email, password, repeatPassword } = formData

    const form = {
      name,
      username,
      email,
      password,
      repeatPassword
    }

    handleValidateForm(form)

    setShowAlert(true)

    setTimeout(() => {
      setShowAlert(false)
    }, 5000)
  }

  const handleValidateForm = ({ name, username, email, password, repeatPassword }) => {
    if (!name || !username || !email || !password) {
      setFormStatus({
        color: 'danger',
        msg: 'Todos los campos son obligatorios'
      })
    } else if (password !== repeatPassword) {
      setFormStatus({
        color: 'warning',
        msg: 'Las contraseñas no coinciden'
      })
    } else {
      setFormStatus({
        color: 'success',
        msg: 'Registro éxitoso'
      })
    }
  }

  return (
    <div>
      <Register
        handleOnChange={handleOnChange}
        handleOnSubmit={handleOnSubmit}
      />
      <AlertVite
        color={formStatus.color}
        msg={formStatus.msg}
        show={showAlert}
        setShow={setShowAlert}
      />
      <br />
    </div>
  )
}

export default FormParent
