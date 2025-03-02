import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
            <MDBCard style={{ borderRadius: '15px', backgroundColor: '#93e2bb' }}>
              <MDBCardBody className='p-4 text-black'>
                {profile
                  ? (
                    <>
                      <div>
                        <MDBTypography tag='h6'>Perfil de Usuario</MDBTypography>
                        <div className='d-flex align-items-center justify-content-between mb-3'>
                          <p className='small mb-0'><MDBIcon far icon='user me-2' />{profile.nombre} {profile.apellido}</p>
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
                          <div>
                            <MDBBtn outline color='dark' rounded size='sm'>Editar Perfil</MDBBtn>
                            <MDBBtn outline color='dark' rounded size='sm' className='mx-1'>Ver Detalles</MDBBtn>
                            <MDBBtn outline color='dark' floating size='sm' onClick={logout}>
                              <MDBIcon fas icon='sign-out-alt' />
                            </MDBBtn>
                          </div>
                        </div>
                      </div>
                      <hr />
                      <MDBCardText>¡Bienvenido, {profile.nombre}!</MDBCardText>
                      <MDBBtn color='black' rounded block size='lg' onClick={logout}>
                        <MDBIcon fas icon='sign-out-alt me-2' /> Cerrar Sesión
                      </MDBBtn>
                    </>
                    )
                  : (
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
