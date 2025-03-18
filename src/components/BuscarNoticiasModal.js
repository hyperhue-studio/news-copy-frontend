import React, { useState } from "react";
import axios from "axios";

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",  // Fondo más suave
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999
};

const modalStyle = {
  backgroundColor: "#ffffff",  // Fondo más claro para el modal
  padding: "30px",
  borderRadius: "12px",
  width: "400px",
  color: "#333",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"  // Sombra suave para profundidad
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#f4f4f4",  // Fondo claro para los inputs
  color: "#333",
  fontSize: "16px",
  transition: "border 0.3s"
};

const buttonStyle = {
  backgroundColor: "#6a94d4",  // Azul suave
  color: "#fff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "8px",
  cursor: "pointer",
  marginRight: "12px",
  fontSize: "16px",
  transition: "background 0.3s, box-shadow 0.3s",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
};

const buttonHoverStyle = {
  backgroundColor: "#4977b1",  // Azul más oscuro al hacer hover
  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)"
};

function BuscarNoticiasModal({ onClose, backendUrl }) {
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleBuscar = async () => {
    try {
      if (!consulta.trim()) {
        alert("Ingrese un texto para buscar.");
        return;
      }
      const resp = await axios.post(`${backendUrl}/buscar_similar`, {
        texto: consulta
      });

      setResultado(resp.data);
    } catch (error) {
      console.error("Error al buscar noticia similar:", error);
      alert("Hubo un error al buscar la similitud.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={overlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0, color: "#333" }}>Buscar Noticia Similar</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="Texto de consulta..."
          value={consulta}
          onChange={(e) => setConsulta(e.target.value)}
        />
        <div style={{ textAlign: "right", marginBottom: "10px" }}>
          <button
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onClick={handleBuscar}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Buscar
          </button>
          <button
            style={buttonStyle}
            onClick={onClose}
          >
            Cerrar
          </button>
        </div>

        {/* Mostrar resultado si existe */}
        {resultado && (
          <div style={{ backgroundColor: "#f4f4f4", padding: "12px", borderRadius: "8px" }}>
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
