import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/PlantaContext";
import { Card, Button } from "react-bootstrap";

const PlantaDetalle = () => {
  const { plantas, addCart } = useContext(Context);
  const { id } = useParams();
  const navigate = useNavigate();

  // Buscar la planta según el ID
  const planta = plantas.find((p) => p.id === parseInt(id));

  if (!planta) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <Card style={{ width: "24rem", textAlign: "center" }}>
        <Card.Img variant="top" src={planta.img} />
        <Card.Body>
          <Card.Title>{planta.name.charAt(0).toUpperCase() + planta.name.slice(1)}</Card.Title>
          <Card.Text><strong>Precio:</strong> ${planta.price}</Card.Text>
          <Card.Text>{planta.detalle}</Card.Text>
          <div className="d-flex justify-content-around">
            <Button variant="success" onClick={() => addCart(planta)}>Añadir al Carrito</Button>
            <Button variant="secondary" onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlantaDetalle;
