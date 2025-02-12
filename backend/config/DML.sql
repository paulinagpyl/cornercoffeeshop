-- SELECT * FROM usuarios;

-- Insertar productos
INSERT INTO productos (nombre, descripcion, precio, imagen_url) VALUES
('Espresso_BD', 'Un café concentrado con un sabor intenso y una capa de crema en la parte superior. Perfecto para los amantes del café fuerte.', 2500, 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg'),
('Cappuccino_BD', 'Una deliciosa combinación de espresso, leche vaporizada y espuma de leche, ideal para quienes disfrutan de un café suave y cremoso.', 3500, 'https://images.pexels.com/photos/434213/pexels-photo-434213.jpeg'),
('Latte_BD', 'Café espresso con abundante leche vaporizada y una ligera capa de espuma, perfecto para un sabor más suave.', 3800, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Caffe_Latte_at_Pulse_Cafe.jpg/1200px-Caffe_Latte_at_Pulse_Cafe.jpg'),
('Americano_BD', 'Espresso diluido con agua caliente, logrando un café más suave pero con el mismo aroma y sabor característico.', 2800, 'https://www.somoselcafe.com.ar/img/novedades/47.jpg'),
('Macchiato_BD', 'Un espresso con un toque de espuma de leche, ideal para quienes buscan un café fuerte con un ligero toque cremoso.', 3200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIXWaHY615SvSCdABSBh9vTeiy1vLhYJLRkw&s'),
('Moka_BD', 'Una deliciosa combinación de espresso, chocolate caliente y leche vaporizada, terminada con crema batida.', 4200, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9SjzEswviCV79VQ7SeTqSc7UkDXHZuW9JMw&s'),
('Flat White_BD', 'Similar al latte pero con menos espuma y más leche vaporizada, brindando un sabor más intenso.', 3600, 'https://imag.bonviveur.com/flat-white.jpg'),
('Affogato_BD', 'Un postre-café con una bola de helado de vainilla cubierta con espresso caliente. Una delicia única.', 4500, 'https://tiendaviaggio.com.ar/cdn/shop/articles/para-blog.jpg?v=1567779506'),
('Café Bombón_BD', 'Una deliciosa mezcla de espresso y leche condensada que ofrece un sabor dulce e intenso.', 3900, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr9c1CDFvq4AIUG6JDnrudPR3Q9pA7vuSJ1g&s'),
('Cold Brew_BD', 'Café preparado en frío durante varias horas, logrando un sabor más suave y menos ácido.', 4300, 'https://www.ocu.org/-/media/ocu/images/home/alimentacion/caf%C3%A9/caf%C3%A9/cold-brewed-coffee_800x450.jpg?rev=40bed042-763f-4556-8c52-36926a1571cf&hash=40F517CB57DEF29639479DBBB1060B45');

-- Insertar usuarios
INSERT INTO usuarios (nombre, apellido, email, pass, rol) VALUES
('Andrea', 'González', 'andrea.gonzalez@example.com', 'admin123', 'admin'),
('Carlos', 'Pérez', 'carlos.perez@example.com', 'user123', 'usuario'),
('María', 'López', 'maria.lopez@example.com', 'editor123', 'editor'),
('Javier', 'Ramírez', 'javier.ramirez@example.com', 'user456', 'usuario'),
('Fernanda', 'Torres', 'fernanda.torres@example.com', 'admin456', 'admin'),
('Lucía', 'Martínez', 'lucia.martinez@example.com', 'editor456', 'editor'),
('Pedro', 'Sánchez', 'pedro.sanchez@example.com', 'user789', 'usuario'),
('Camila', 'Hernández', 'camila.hernandez@example.com', 'editor789', 'editor'),
('Alejandro', 'Castro', 'alejandro.castro@example.com', 'admin789', 'admin'),
('Sofía', 'Vargas', 'sofia.vargas@example.com', 'user000', 'usuario');

-- Insertar ventas
INSERT INTO ventas (usuario_id, producto_id, fecha) VALUES
(1, 3, '2025-02-01 08:30:00'),
(2, 5, '2025-02-03 09:15:00'),
(3, 1, '2025-02-05 10:00:00'),
(4, 7, '2025-02-07 11:45:00'),
(5, 2, '2025-02-09 12:30:00'),
(6, 6, '2025-02-11 13:20:00'),
(7, 8, '2025-02-13 14:10:00'),
(8, 4, '2025-02-15 15:00:00'),
(9, 9, '2025-02-17 15:45:00'),
(10, 10, '2025-02-19 16:30:00'),
(1, 2, '2025-02-21 17:15:00'),
(3, 6, '2025-02-23 18:00:00'),
(5, 7, '2025-02-25 18:45:00'),
(7, 1, '2025-02-27 19:30:00'),
(9, 3, '2025-02-28 20:15:00');
