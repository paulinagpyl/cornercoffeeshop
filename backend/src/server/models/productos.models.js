/* eslint-disable camelcase */
const db = require('../database/db_connect.js')

module.exports.findAll = () => db('SELECT * FROM productos;')

module.exports.findById = (id) => db('SELECT * FROM productos WHERE producto_id = $1;', [id])

module.exports.create = ({ nombre, descripcion, precio, imagen_url }) =>
  db('INSERT INTO productos (producto_id, nombre, descripcion, precio, imagen_url) VALUES (DEFAULT, $1, $2, $3,$4) RETURNING *;', [nombre, descripcion, precio, imagen_url])

// eslint-disable-next-line camelcase
module.exports.updateById = (id, { nombre, descripcion, precio, imagen_url }) =>
  db('UPDATE productos SET nombre = $2, descripcion=$3, precio = $4, imagen_url = $5 WHERE producto_id = $1 RETURNING *;', [id, nombre, descripcion, precio, imagen_url])

module.exports.deleteById = (id) => db('DELETE FROM productos WHERE producto_id = $1 RETURNING *;', [id])
