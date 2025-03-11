import { useState } from "react";
import axios from "axios";
import IndexarNoticias from "./components/IndexarNoticias";
import BuscarSimilar from "./components/BuscarSimilar";

function App() {
  const [noticia, setNoticia] = useState("");
  const [copy, setCopy] = useState("");
  const [noticiasSimilares, setNoticiasSimilares] = useState([]);

  const backendUrl = "https://news-copy-backend.onrender.com";

  const guardarNoticia = async () => {
    await axios.post(`${backendUrl}/guardar_noticia`, { noticia, copy });
    alert("Noticia guardada!");
  };

  const buscarSimilares = async () => {
    const response = await axios.post(`${backendUrl}/buscar_similar`, { noticia });
    setNoticiasSimilares(response.data.similares);
  };

  const generarCopy = async () => {
    const response = await axios.post(`${backendUrl}/generar_copy`, { noticia });
    setCopy(response.data.copy_generado);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Generador de Copys para Noticias 📰</h2>
      <textarea
        rows="4"
        cols="50"
        placeholder="Escribe la noticia aquí..."
        value={noticia}
        onChange={(e) => setNoticia(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Copy opcional para almacenar"
        value={copy}
        onChange={(e) => setCopy(e.target.value)}
      />
      <br />
      <button onClick={guardarNoticia}>Guardar Noticia</button>
      <button onClick={buscarSimilares}>Buscar Similares</button>
      <button onClick={generarCopy}>Generar Copy</button>

      {noticiasSimilares.length > 0 && (
        <div>
          <h3>Noticias Similares</h3>
          {noticiasSimilares.map((item, index) => (
            <p key={index}>
              <strong>{item.noticia}</strong>: {item.copy}
            </p>
          ))}
        </div>
      )}

      {copy && <p><strong>Copy generado:</strong> {copy}</p>}

      <IndexarNoticias />

      <BuscarSimilar />
    </div>
  );
}

export default App;
