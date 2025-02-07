import { useContext, useState } from "react";
import { Context } from "../store/PlantaContext";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

const Gallery = () => {
  const { plantas, addCart } = useContext(Context);
  const navigate = useNavigate();

  if (!plantas) {
    return <div>Cargando...</div>;
  }

  return (
    // <div className="gallery grid-columns-5 p-3">
    <div className="gallery grid-columns-4 p-3">
      {plantas.map((planta) => (
        <Card className="card" style={{ width: "18rem", display: "flex", flexDirection: "column", height: "100%" }} key={planta.id}>
          <Card.Img className="photo" variant="top" src={planta.img} />
          <Card.Body style={{ flexGrow: 1 }}>
            <Card.Title>
              {planta.name.charAt(0).toUpperCase() + planta.name.slice(1)}
            </Card.Title>
            <Card.Text>Precio: {planta.price}</Card.Text>
            <Card.Text>Descripción: {planta.detalle}</Card.Text>
          </Card.Body>
          <div style={{ display: "flex", gap: "10px", justifyContent: "center", padding: "10px" }}>
            <Button 
              variant="dark" 
              style={{ backgroundColor: "#8B4513", borderColor: "#8B4513" }}
              onClick={() => navigate(`/plantas/${planta.id}`)}
            >
              Ver detalle
            </Button>
            {/* <Button 
              variant="dark" 
              style={{ backgroundColor: "#8B4513", borderColor: "#8B4513" }} 
              onClick={() => addCart(planta)}
            >
              Añadir
            </Button> */}
          </div>
        </Card>
      ))} 
    </div>
  );
  
};

export default Gallery;
