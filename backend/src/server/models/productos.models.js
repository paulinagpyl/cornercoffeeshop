import db from '../database/db_connect.js'

export const findAll = () => db('SELECT * FROM productos;')

export const findById = (id) => db('SELECT * FROM productos WHERE producto_id = $1;', [id])

export const create = ({ nombre, descripcion, precio, imagen_url }) =>
  db('INSERT INTO productos (producto_id, nombre, descripcion, precio, imagen_url) VALUES (DEFAULT, $1, $2, $3) RETURNING *;', [nombre, descripcion, precio,imagen_url])

export const updateById = (id, { nombre, descripcion, precio, imagen_url }) =>
  db('UPDATE productos SET nombre = $2, descripcion=$3, precio = $4, imagen_url = $5 WHERE producto_id = $1 RETURNING *;', [id, nombre,descripcion, precio, imagen_url])

export const deleteById = (id) => db('DELETE FROM productos WHERE productos_id = $1 RETURNING *;', [id])


// CREATE TABLE productos (
//     producto_id SERIAL PRIMARY KEY,
//     nombre VARCHAR(150) NOT NULL,
//     descripcion TEXT,
//     precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
//     imagen_url TEXT NOT NULL
// );
