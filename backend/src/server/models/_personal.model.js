import db from '../database/db_connect.js'

export const findAll = () => db('SELECT * FROM personal;')

export const findById = (id) => db('SELECT * FROM personal WHERE id = $1;', [id])

export const create = ({ nombre, rol, salario }) =>
  db('INSERT INTO personal (id, nombre, rol, salario) VALUES (DEFAULT, $1, $2, $3) RETURNING *;', [nombre, rol, salario])

export const updateById = (id, { nombre, rol, salario }) =>
  db('UPDATE personal SET nombre = $2, rol = $3, salario = $4 WHERE id = $1 RETURNING *;', [id, nombre, rol, salario])

export const deleteById = (id) => db('DELETE FROM personal WHERE id = $1 RETURNING *;', [id])
