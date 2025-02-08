import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/PlantaContext";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const PlantaDetalle = () => {
  const { plantas, addCart } = useContext(Context);
  const { id } = useParams();
  const [plantaData, setPlantaData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (plantas.length > 0) { 
      const foundPlanta = plantas.find((planta) => String(planta.id) === id);
      setPlantaData(foundPlanta);
    }
  }, [id, plantas]);

  if (!plantaData) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="planta-detalle-container p-3">
      <Card className="card detalle-card" style={{ width: "100%", maxWidth: "900px", display: "flex", flexDirection: "row", margin: "0 auto" }}>
        {/* Imagen del producto */}
        <Card.Img className="photo" variant="top" src={plantaData.img} style={{ width: "40%", objectFit: "cover" }} />

        {/* Detalles del producto */}
        <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "20px" }}>
          <Card.Title style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {plantaData.name.charAt(0).toUpperCase() + plantaData.name.slice(1)}
          </Card.Title>
          <Card.Text style={{ marginBottom: "15px" }}>
            <strong>Detalle:</strong> {plantaData.detalle}
          </Card.Text>
          <Card.Text style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
            <strong>Precio:</strong> {plantaData.price}
          </Card.Text>

          {/* Botón para añadir al carrito */}
          <Button 
            variant="dark" 
            style={{ backgroundColor: "#8B4513", borderColor: "#8B4513" }}
            // onClick={() => addCart(plantaData)}>
            onClick={() => navigate(`/`) }>
            Volver a Corner Coffee Shop
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlantaDetalle;
