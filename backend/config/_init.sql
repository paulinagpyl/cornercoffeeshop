CREATE DATABASE coffeshop;

CREATE TABLE productos (
    productos_id SERIAL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL
);
