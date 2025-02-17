
const request = require('supertest')
const server = require('../app')

describe('Operaciones CRUD de productos', () => {
  test('La ruta GET /productos devuelve un status code 200 y un array de al menos un objeto', async () => {
    const response = await request(server).get('/productos')
    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body.length).toBeGreaterThan(0)
  })

  test('La ruta GET /productos/:id devuelve un status code 200 y el producto correspondiente', async () => {
    const response = await request(server).get('/productos/1')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id', 1)
  })

  test('La ruta POST /productos agrega un nuevo producto y devuelve un código 201', async () => {
    const newProduct = { nombre: 'Producto Nuevo', precio: 100 }
    const response = await request(server).post('/productos').send(newProduct)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.nombre).toBe('Producto Nuevo')
  })

  test('La ruta PUT /productos/:id actualiza un producto y devuelve un código 200', async () => {
    const updatedProduct = { nombre: 'Producto Actualizado', precio: 120 }
    const response = await request(server).put('/productos/1').send(updatedProduct)
    expect(response.status).toBe(200)
    expect(response.body.nombre).toBe('Producto Actualizado')
  })

  test('La ruta DELETE /productos/:id elimina un producto y devuelve un código 204', async () => {
    const response = await request(server).delete('/productos/1')
    expect(response.status).toBe(204)
  })

  test('La ruta DELETE /productos/:id devuelve un status code 404 si el ID no existe', async () => {
    const idDoesNotExist = 9999
    const response = await request(server).delete(`/productos/${idDoesNotExist}`)
    expect(response.status).toBe(404)
    expect(response.body.message).toBe('Producto no encontrado')
  })
})

describe('Operaciones de usuarios', () => {
  test('La ruta POST /register registra un nuevo usuario y devuelve un código 201', async () => {
    const newUser = { email: 'test@example.com', password: 'password123' }
    const response = await request(server).post('/register').send(newUser)
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
    expect(response.body.email).toBe(newUser.email)
  })

  test('La ruta POST /login inicia sesión y devuelve un token', async () => {
    const userLogin = { email: 'test@example.com', password: 'password123' }
    const response = await request(server).post('/login').send(userLogin)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })

  test('La ruta POST /login devuelve un status code 401 si las credenciales son incorrectas', async () => {
    const wrongLogin = { email: 'test@example.com', password: 'wrongpassword' }
    const response = await request(server).post('/login').send(wrongLogin)
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Credenciales incorrectas')
  })
})
