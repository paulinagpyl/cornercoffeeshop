import React, { useContext, useState } from 'react'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox
}
  from 'mdb-react-ui-kit'
import { UserContext } from '../store/UserContext'

const LoginForm = () => {
  const { login } = useContext(UserContext) // Obtener la función login del contexto
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleLogin = async () => {
    const { email, password } = formData

    // Llamar a la función login del UserContext
    await login(email, password)
  }

  return (
    <MDBContainer className='my-5'>
      <MDBCard>
        <MDBRow className='g-0 d-flex align-items-center'>
          <MDBCol md='4'>
            <MDBCardImage
              src='https://www.freepik.com/free-vector/realistic-coffee-background-with-drawings_25304127.htm#fromView=search&page=1&position=19&uuid=db4af68a-370b-4983-ae9a-7365332268f8&query=coffee'
              alt='coffee'
              className='rounded-t-10 rounded-tr-md-0'
              fluid
            />
          </MDBCol>

          <MDBCol md='8'>
            <MDBCardBody>
              <MDBInput
                wrapperClass='mb-4'
                label='Email address'
                id='email'
                type='email'
                value={formData.email}
                onChange={handleInputChange}
              />

              <MDBInput
                wrapperClass='mb-4'
                label='Password'
                id='password'
                type='password'
                value={formData.password}
                onChange={handleInputChange}
              />

              <div className='d-flex justify-content-between mx-4 mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href='!#'>Forgot password?</a>
              </div>

              <MDBBtn className='mb-4 w-100' onClick={handleLogin}>Sign in</MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  )
}

export default LoginForm
