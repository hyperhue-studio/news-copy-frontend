import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import IndexarNoticiasModal from "./components/IndexarNoticiasModal";
import BuscarNoticiasModal from "./components/BuscarNoticiasModal"; // <-- Nombre distinto

function App() {
  const [urlNoticia, setUrlNoticia] = useState("");
  const [facebookCopy, setFacebookCopy] = useState("");
  const [twitterCopy, setTwitterCopy] = useState("");
  const [wppCopy, setWppCopy] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false); // Nuevo estado

  const backendUrl = "https://news-copy-backend.onrender.com";

  const handleGenerar = async () => {
    if (!urlNoticia.trim()) {
      alert("Por favor, ingresa un enlace de la nota.");
      return;
    }
    try {
      const resp = await axios.post(`${backendUrl}/generate-copies`, { url: urlNoticia });
      const data = resp.data;
      setFacebookCopy(data.facebook || "");
      setTwitterCopy(data.twitter || "");
      setWppCopy(data.wpp || "");
    } catch (error) {
      console.error("Error generando copy:", error);
      alert("Hubo un error al generar el copy.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Texto copiado al portapapeles");
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrlNoticia(text);
    } catch (err) {
      alert("No se pudo leer del portapapeles. Revisa permisos o intenta manualmente.");
    }
  };

  return (
    <div className="App">
      {/* Contenedor del título */}
      <div className="title-container">
        {/* Botón lupa (abre modal de búsqueda) */}
        <button 
          className="search-button" 
          onClick={() => setShowSearchModal(true)}
        >
          🔍
        </button>

        <h1>Generador de Copys</h1>

        {/* Botón flotante (+) a la derecha */}
        <button 
          className="floating-button" 
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      </div>

      {/* Sección de entrada */}
      <div className="input-section">
        <div className="input-row">
          <span className="note-label">Enlace de la nota:</span>
          <button onClick={handlePaste}>Pegar</button>
          <input
            className="note-input"
            type="text"
            value={urlNoticia}
            onChange={(e) => setUrlNoticia(e.target.value)}
            placeholder="https://..."
          />
          <button onClick={handleGenerar}>Generar</button>
        </div>

        <div className="url-buttons">
          <button>Copiar URL Original</button>
          <button>Copiar URL Acortada</button>
        </div>
      </div>

      {/* Contenedor de tarjetas */}
      <div className="card-container">
        {/* Tarjeta Facebook */}
        <div className="card">
          <div className="card-header">Facebook</div>
          <textarea readOnly value={facebookCopy} />
          <button onClick={() => copyToClipboard(facebookCopy)}>Copiar</button>
        </div>

        {/* Tarjeta Twitter */}
        <div className="card">
          <div className="card-header">Twitter</div>
          <textarea readOnly value={twitterCopy} />
          <button onClick={() => copyToClipboard(twitterCopy)}>Copiar</button>
        </div>

        {/* Tarjeta WhatsApp */}
        <div className="card">
          <div className="card-header">WhatsApp</div>
          <textarea readOnly value={wppCopy} />
          <button onClick={() => copyToClipboard(wppCopy)}>Copiar</button>
        </div>
      </div>

      {/* Modal para Indexar Noticias */}
      {showModal && (
        <IndexarNoticiasModal
          onClose={() => setShowModal(false)}
          backendUrl={backendUrl}
        />
      )}

      {/* Modal para Buscar Noticias Similares */}
      {showSearchModal && (
        <BuscarNoticiasModal
          onClose={() => setShowSearchModal(false)}
          backendUrl={backendUrl}
        />
      )}
    </div>
  );
}

export default App;
