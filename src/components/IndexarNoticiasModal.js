import React, { useState } from "react";
import axios from "axios";

const modalOverlayStyle = {
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

function IndexarNoticiasModal({ onClose, backendUrl }) {
  const [titulo, setTitulo] = useState("");
  const [copy, setCopy] = useState("");

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
    // Cerrar modal si se hace click en el overlay
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div style={modalOverlayStyle} onClick={handleOverlayClick}>
      <div style={modalStyle}>
        <h3 style={{ marginTop: 0 }}>Añadir Noticia</h3>
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
        <div style={{ textAlign: "right" }}>
          <button style={buttonStyle} onClick={handleIndexar}>
            Guardar
          </button>
          <button style={buttonStyle} onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndexarNoticiasModal;
