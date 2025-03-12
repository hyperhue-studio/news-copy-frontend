import React, { useState } from "react";
import axios from "axios";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modalStyle = {
  backgroundColor: "#2c2c2c",
  padding: "20px",
  borderRadius: "5px",
  width: "400px",
  color: "#fff"
};

const inputStyle = {
  width: "100%",
  padding: "8px",
  marginBottom: "12px",
  borderRadius: "5px",
  border: "1px solid #444",
  backgroundColor: "#1f1f1f",
  color: "#fff"
};

const buttonStyle = {
  backgroundColor: "#444",
  color: "#fff",
  border: "none",
  padding: "10px 16px",
  borderRadius: "5px",
  cursor: "pointer",
  marginRight: "8px"
};

function BuscarNoticiasModal({ onClose, backendUrl }) {
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState(null);

  // Maneja la búsqueda llamando al endpoint /buscar_similar
  const handleBuscar = async () => {
    try {
      if (!consulta.trim()) {
        alert("Ingrese un texto para buscar.");
        return;
      }
      const resp = await axios.post(`${backendUrl}/buscar_similar`, {
        texto: consulta
      });
      
      // resp.data: { id, score, metadata: { noticia, copy } }
      setResultado(resp.data);
    } catch (error) {
      console.error("Error al buscar noticia similar:", error);
      alert("Hubo un error al buscar la similitud.");
    }
  };

  // Cerrar modal haciendo click en overlay
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0 }}>Buscar Noticia Similar</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="Texto de consulta..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button style={buttonStyle} onClick={handleBuscar}>
            Buscar
          </button>
          <button style={buttonStyle} onClick={onClose}>
            Cerrar
          </button>
        </div>

        {/* Mostrar resultado si existe */}
        {resultado && (
          <div style={{ backgroundColor: "#333", padding: "10px", borderRadius: "5px" }}>
            <p><strong>ID:</strong> {resultado.id}</p>
            <p><strong>Score:</strong> {resultado.score}</p>
            <p><strong>Título/Noticia:</strong> {resultado.metadata?.noticia}</p>
            <p><strong>Copy:</strong> {resultado.metadata?.copy}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BuscarNoticiasModal;
