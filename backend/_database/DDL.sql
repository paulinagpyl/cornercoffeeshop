-- DROP DATABASE farmacia;
-- DROP TABLE medicamentos;
-- DROP TABLE personal;

CREATE DATABASE farmacia;

\c farmacia;
CREATE table USUARIOS(
  id        SERIAL,
  email     VARCHAR(50)   NOT NULL UNIQUE,
  pass      VARCHAR(50)   NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE medicamentos (
  id        SERIAL,
  nombre    VARCHAR(50)   NOT NULL,
  precio    INT           NOT NULL,
  stock     INT           NOT NULL CHECK (stock >= 0)
);

CREATE TABLE personal (
  id        SERIAL,
  nombre    VARCHAR(50)   NOT NUlL,
  rol       VARCHAR(50)   NOT NUlL,
  salario   INT           NOT NULL
);
