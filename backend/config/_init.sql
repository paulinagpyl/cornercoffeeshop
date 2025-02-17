-- Active: 1730683703648@@127.0.0.1@5432@cornercoffeeshop
CREATE DATABASE cornercoffeeshop;

CREATE TABLE productos (
    productos_id SERIAL,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT,
    precio DECIMAL
);
