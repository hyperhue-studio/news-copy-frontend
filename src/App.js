import React, { useState } from "react";
import axios from "axios";
import { FaClipboard, FaArrowRight, FaPaste } from 'react-icons/fa';
import "./App.css";
import IndexarNoticiasModal from "./components/IndexarNoticiasModal";
import BuscarNoticiasModal from "./components/BuscarNoticiasModal";

function App() {
  const [urlNoticia, setUrlNoticia] = useState("");
  const [facebookCopy, setFacebookCopy] = useState("");
  const [twitterCopy, setTwitterCopy] = useState("");
  const [wppCopy, setWppCopy] = useState("");
  const [foundCopies, setFoundCopies] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

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
      setFoundCopies(data.foundCopies || []);
    } catch (error) {
      console.error("Error generando copy:", error);
      alert("Hubo un error al generar el copy.");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
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
      <div className="title-container">
        <button
          className="search-button"
          onClick={() => setShowSearchModal(true)}
        >
          🔍
        </button>

        <h1>Generador de Copys</h1>

        <button
          className="floating-button"
          onClick={() => setShowModal(true)}
        >
          +
        </button>
      </div>

      <div className="input-section">
        <div className="input-row">
          <button
            className="mini-button"
            onClick={handlePaste}
          >
            <FaPaste />
          </button>
          <input
            className="note-input"
            type="text"
            value={urlNoticia}
            onChange={(e) => setUrlNoticia(e.target.value)}
            placeholder="Pega enlace aquí..."
          />
          <button
            className="mini-button"
            onClick={handleGenerar}
          >
            <FaArrowRight />
          </button>
        </div>

        <div className="url-buttons">
          <button>Copiar URL Original</button>
          <button>Copiar URL Acortada</button>
        </div>
      </div>

      <div className="card-container">
        {/* Tarjeta Facebook */}
        <div className="card">
          <div className="card-header">
            Facebook
            <button
              className="copy-icon-button"
              onClick={() => copyToClipboard(facebookCopy)}
            >
              <FaClipboard />
            </button>
          </div>
          <textarea readOnly value={facebookCopy} />
        </div>

        {/* Tarjeta Twitter */}
        <div className="card">
          <div className="card-header">
            Twitter
            <button
              className="copy-icon-button"
              onClick={() => copyToClipboard(twitterCopy)}
            >
              <FaClipboard />
            </button>
          </div>
          <textarea readOnly value={twitterCopy} />
        </div>

        {/* Tarjeta WhatsApp */}
        <div className="card">
          <div className="card-header">
            WhatsApp
            <button
              className="copy-icon-button"
              onClick={() => copyToClipboard(wppCopy)}
            >
              <FaClipboard />
            </button>
          </div>
          <textarea readOnly value={wppCopy} />
        </div>
      </div>

      {foundCopies.length > 0 && (
        <div style={{ marginTop: "20px", backgroundColor: "#2c2c2c", padding: "15px", borderRadius: "8px" }}>
          <h3 style={{ textAlign: "center" }}>Copies de Referencia (RAG)</h3>
          {foundCopies.map((item, i) => (
            <p key={i} style={{ margin: "8px 0", textAlign: "center" }}>
              {item.copy}
            </p>
          ))}
        </div>
      )}

      {showModal && (
        <IndexarNoticiasModal
          onClose={() => setShowModal(false)}
          backendUrl={backendUrl}
        />
      )}

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
