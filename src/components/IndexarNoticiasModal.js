import React, { useState } from "react";
import axios from "axios";

const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0, 0, 0, 0.3)",
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
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)"  // Sombra suave para darle profundidad
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "16px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  backgroundColor: "#f4f4f4",  // Color claro para los inputs
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

function IndexarNoticiasModal({ onClose, backendUrl }) {
  const [titulo, setTitulo] = useState("");
  const [copy, setCopy] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const handleIndexar = async () => {
    try {
      if (!titulo.trim() || !copy.trim()) {
        alert("Ingrese título y copy.");
        return;
      }
      await axios.post(`${backendUrl}/indexar`, {
        noticia: titulo,
        copy
      });
      alert("Noticia indexada en Pinecone.");
      onClose();
    } catch (error) {
      console.error("Error al indexar noticia:", error);
      alert("Hubo un error al indexar la noticia.");
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalOverlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0, color: "#333" }}>Añadir Noticia</h3>
        <input
          style={inputStyle}
          type="text"
          placeholder="Título/resumen..."
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <input
          style={inputStyle}
          type="text"
          placeholder="Copy de Facebook..."
          value={copy}
          onChange={(e) => setCopy(e.target.value)}
        />
        <div style={{ textAlign: "center" }}>
          <button
            style={buttonStyle}
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            style={isHovered ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle}
            onClick={handleIndexar}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndexarNoticiasModal;
