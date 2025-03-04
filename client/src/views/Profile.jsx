/* eslint-disable multiline-ternary */
import { useContext, useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { UserContext } from '../store/UserContext'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBCardImage,
  MDBBtn,
  MDBIcon,
  MDBCardText
} from 'mdb-react-ui-kit'

const Profile = () => {
  const { profile, getProfile, token, logout } = useContext(UserContext)
  const navigate = useNavigate()
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (!token) {
      navigate('/login')
    } else {
      getProfile() // Obtener perfil al montar el componente
    }
  }, [token, navigate, getProfile])

  return (
    <div className='vh-100' style={{ backgroundColor: '#eee' }}>
      <MDBContainer>
        <MDBRow className='justify-content-center'>
          <MDBCol md='9' lg='7' xl='5' className='mt-5'>
            <MDBCard style={{ borderRadius: '15px', backgroundColor: '#916A53' }}>
              <MDBCardBody className='p-4 text-black'>
                {profile ? (
                  <>
                    <div>
                      <MDBTypography tag='h6'>Perfil de Usuario</MDBTypography>
                      <div className='d-flex align-items-center justify-content-between mb-3'>
                        <p className='small mb-0'>
                          <MDBIcon far icon='user me-2' />
                          {profile.nombre.charAt(0).toUpperCase() + profile.nombre.slice(1)} {profile.apellido}
                        </p>
                        <p className='fw-bold mb-0'>{profile.rol}</p>
                      </div>
                    </div>
                    <div className='d-flex align-items-center mb-4'>
                      <div className='flex-shrink-0'>
                        <MDBCardImage
                          style={{ width: '70px' }}
                          className='img-fluid rounded-circle border border-dark border-3'
                          src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp'
                          alt='Avatar de usuario'
                          fluid
                        />
                      </div>
                      <div className='flex-grow-1 ms-3'>
                        <div className='d-flex flex-row align-items-center mb-2'>
                          <p className='mb-0 me-2'>{profile.email}</p>
                        </div>
                        <div className='d-flex gap-2'>
                          <NavLink to='/catalogo'>
                            <MDBBtn outline color='dark' rounded size='sm'>
                              Ir a Catálogo
                            </MDBBtn>
                          </NavLink>
                          <MDBBtn
                            outline
                            color='dark'
                            rounded
                            size='sm'
                            onClick={() => setShowDetails(!showDetails)}
                          >
                            {showDetails ? 'Ocultar Detalles' : 'Ver Detalles'}
                          </MDBBtn>
                          <MDBBtn outline color='dark' floating size='sm' onClick={logout}>
                            <MDBIcon fas icon='sign-out-alt' />
                          </MDBBtn>
                        </div>
                      </div>
                    </div>

                    {/* Mostrar detalles si showDetails es true */}
                    {showDetails && (
                      <MDBCard style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '10px', marginTop: '10px' }}>
                        <MDBCardBody>
                          <MDBTypography tag='h6' className='mb-2'>Detalles del Usuario</MDBTypography>
                          <p><strong>Nombre:</strong> {profile.nombre}</p>
                          <p><strong>Apellido:</strong> {profile.apellido}</p>
                          <p><strong>Correo:</strong> {profile.email}</p>
                        </MDBCardBody>
                      </MDBCard>
                    )}

                    <hr />
                    <MDBCardText>¡Bienvenido, {profile?.nombre.charAt(0).toUpperCase() + profile?.nombre.slice(1)}!</MDBCardText>
                    <MDBBtn color='black' rounded block size='lg' onClick={logout}>
                      <MDBIcon fas icon='sign-out-alt me-2' /> Cerrar Sesión
                    </MDBBtn>
                  </>
                ) : (
                  <p>Cargando perfil...</p>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}

export default Profile
