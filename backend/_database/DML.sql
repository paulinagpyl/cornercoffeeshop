INSERT INTO medicamentos (id, nombre, precio, stock) VALUES
  (DEFAULT, 'Paracetamol', 3500, 25 ),
  (DEFAULT, 'Ibuprofeno', 6900, 10 ),
  (DEFAULT, 'Orfidal', 10900, 30 ),
  (DEFAULT, 'Zolpidem', 5000, 12 ),
  (DEFAULT, 'Mentix', 35900, 22 ),
  (DEFAULT, 'Diclofenaco', 1900, 50 ),
  (DEFAULT, 'Frenadol', 4900, 41 ),
  (DEFAULT, 'Piretanyl', 1290, 7 ),
  (DEFAULT, 'Aspirina', 4500, 35 ),
  (DEFAULT, 'Ventolin', 22900, 5 );

INSERT INTO personal (id, nombre, rol, salario) VALUES
  (DEFAULT, 'Jane Margolis', 'administrador' , 5000),
  (DEFAULT, 'Skyler White', 'cajero' , 3500),
  (DEFAULT, 'Ignacio Vargas', 'administrador' , 2200),
  (DEFAULT, 'Walter White', 'farmaceutico' , 7000),
  (DEFAULT, 'Jesse Pinkman', 'farmaceutico' , 6500),
  (DEFAULT, 'Gustavo Fring', 'gerente' , 10000),
  (DEFAULT, 'Saul Goodman', 'abogado' , 4000),
  (DEFAULT, 'Hank Schrader', 'seguridad' , 1500),
  (DEFAULT, 'Mike Ehrmantraut', 'seguridad' , 1750);

INSERT INTO usuarios (id, email, pass) VALUES 
  (DEFAULT, 'pgp@gonza.cl','12345678');

SELECT * FROM medicamentos;
SELECT * FROM personal;
select * from usuarios;