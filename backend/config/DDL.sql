-- CREATE DATABASE softjobs;


-- \c softjobs;

-- CREATE TABLE usuarios (
--   id        SERIAL        NOT NULL,
--   email     VARCHAR(50)   NOT NULL  UNIQUE,
--   password  VARCHAR(60)   NOT NULL,
--   rol       VARCHAR(25)   NOT NULL,
--   lenguage  VARCHAR(20)   NOT NULL,
--   PRIMARY KEY (id)
-- );

-- DROP TABLE ventas;
-- DROP TABLE productos;
-- DROP TABLE usuarios;


CREATE TABLE usuarios (
    usuario_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    pass  VARCHAR(60)   NOT NULL,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('admin', 'usuario', 'editor'))
);

CREATE TABLE productos (
    producto_id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    imagen_url TEXT NOT NULL
);

CREATE TABLE ventas (
    venta_id SERIAL PRIMARY KEY,
    usuario_id INT NOT NULL,
    producto_id INT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (producto_id) REFERENCES productos(producto_id) ON DELETE CASCADE
);