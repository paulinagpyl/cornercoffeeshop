import db from '../database/db_connect.js'

// a este codigo le falta lo de clase anterior
// paginacion y restricciones de la query para precio máximo, minimo, cantidad registros
// se modifica la función findAll completa, recibiendo los paramteros que mandan para consultar

export const findAll = () => db('SELECT * FROM medicamentos;')

export const findById = (id) => db('SELECT * FROM medicamentos WHERE id = $1;', [id])

export const create = ({ nombre, precio, stock }) =>
  db('INSERT INTO medicamentos (id, nombre, precio, stock) VALUES (DEFAULT, $1, $2, $3) RETURNING *;', [nombre, precio, stock])

export const updateById = (id, { nombre, precio, stock }) =>
  db('UPDATE medicamentos SET nombre = $2, precio = $3, stock = $4 WHERE id = $1 RETURNING *;', [id, nombre, precio, stock])

export const deleteById = (id) => db('DELETE FROM medicamentos WHERE id = $1 RETURNING *;', [id])
