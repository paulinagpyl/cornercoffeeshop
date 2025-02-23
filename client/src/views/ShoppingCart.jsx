import React, { useState, useContext, useEffect } from "react";
import { CoffeeContext } from "../store/CoffeeContext";
import { UserContext } from "../store/UserContext";

const ShoppingCart = () => {
  const { cart, totalCart, decreaseCount, increaseCount, removeItem } = useContext(CoffeeContext);
  const { token, checkout } = useContext(UserContext);

  const [purchaseCompleted, setPurchaseCompleted] = useState(false);

  const handleCheckout = async () => {
    if (!token) {
      alert("Debes iniciar sesión para proceder con la compra.");
      return;
    }

    setPurchaseCompleted(true);

    const orderDetails = {
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.count,
        price: item.price,
      })),
      total: totalCart,
    };

    try {
      const response = await checkout(orderDetails);
      if (response) {
        console.log("¡CHECKOUT EXITOSO!");
      }
    } catch (error) {
      console.error("Error durante el checkout:", error);
    }
  };

  // Formatear precios con separador de miles (CLP)
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CL", { minimumFractionDigits: 0 }).format(price);
  };

  // Limpiar mensaje de compra después de 5 segundos
  useEffect(() => {
    if (purchaseCompleted) {
      const timer = setTimeout(() => setPurchaseCompleted(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [purchaseCompleted]);

  return (
    <section className="h-100">
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0">🛒 Tu Carrito</h3>
            </div>

            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={item.id} className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      {/* Imagen del producto */}
                      <div className="col-md-2">
                        <img src={item.img} className="img-fluid rounded-3" alt={item.name} />
                      </div>

                      {/* Detalles del producto */}
                      <div className="col-md-3">
                        <p className="lead fw-normal mb-2">{item.name}</p>
                        <p className="text-muted">
                          <strong>Ingredientes:</strong> {item.ingredients?.join(", ") || "N/A"}
                        </p>
                      </div>

                      {/* Contador de cantidad */}
                      <div className="col-md-3 d-flex align-items-center">
                        <button className="btn btn-link px-2" onClick={() => decreaseCount(item.id)}>
                          ➖
                        </button>
                        <span className="form-control text-center mx-2" style={{ maxWidth: "50px" }}>
                          {item.count}
                        </span>
                        <button className="btn btn-link px-2" onClick={() => increaseCount(item.id)}>
                          ➕
                        </button>
                      </div>

                      {/* Precio Total por Producto */}
                      <div className="col-md-2">
                        <h5 className="mb-0">💲{formatPrice(item.price * item.count)}</h5>
                      </div>

                      {/* Botón de eliminar */}
                      <div className="col-md-1 text-end">
                        <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">🛍 Tu carrito está vacío.</p>
            )}

            {/* Resumen y botón de compra */}
            <div className="card">
              <div className="card-body text-center">
                <h5 className="mb-3">Total: <strong>💲{formatPrice(totalCart)}</strong></h5>
                <button
                  type="button"
                  className="btn btn-warning btn-lg"
                  onClick={handleCheckout}
                  disabled={!token || cart.length === 0}
                >
                  🛒 Proceder al Pago
                </button>

                {purchaseCompleted && (
                  <div className="alert alert-success mt-3">✅ ¡Compra realizada con éxito!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
