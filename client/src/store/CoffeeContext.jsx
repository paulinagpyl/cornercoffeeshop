import { createContext, useState, useEffect, useContext } from 'react';

const CoffeeContext = createContext();

const CoffeeProvider = ({ children }) => {
  const [coffee, setCoffee] = useState([]); // Inicializa coffee como un array vacío
  const [cart, setCart] = useState([]);

  // Lógica para obtener el café desde la base de datos (ya la tienes implementada correctamente)
  useEffect(() => {
    const getCoffeeFromDB = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos');
        const data = await response.json();

        if (data.status) {
          const formattedCoffees = data.message.map((item) => ({
            id: item.producto_id,
            img: item.imagen_url,
            name: item.nombre,
            detalle: item.descripcion,
            price: parseFloat(item.precio),
          }));
          setCoffee(formattedCoffees);
        } else {
          console.error('Error al cargar los cafés desde la base de datos');
        }
      } catch (error) {
        console.error('Error al obtener los cafés:', error);
      }
    };

    getCoffeeFromDB();
  }, []);

  // Función para agregar café al carrito
  const addCart = (coffeeItem) => {
    const foundCoffee = cart.findIndex((cartCoffee) => cartCoffee.id === coffeeItem.id);
    if (foundCoffee < 0) {
      coffeeItem.count = 1;
      setCart([...cart, coffeeItem]);
    } else {
      cart[foundCoffee].count++;
      setCart([...cart]);
    }
  };

  const totalCart = cart.reduce((accum, { price, count }) => accum + price * count, 0);

  return (
    <CoffeeContext.Provider value={{ coffee, cart, setCart, addCart, totalCart }}>
      {children}
    </CoffeeContext.Provider>
  );
};

// Exportación del contexto y proveedor
export { CoffeeContext, CoffeeProvider };
