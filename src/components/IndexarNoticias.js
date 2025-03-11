import { useState } from "react";
import axios from "axios";

function IndexarNoticias() {
  const [nuevaNoticia, setNuevaNoticia] = useState("");
  const [nuevoCopy, setNuevoCopy] = useState("");

  const backendUrl = "https://news-copy-backend.onrender.com";

  const indexarNoticia = async () => {
    try {
      await axios.post(`${backendUrl}/indexar`, {
        noticia: nuevaNoticia,
        copy: nuevoCopy
      });
      alert("Noticia guardada e indexada en Pinecone.");
      setNuevaNoticia("");
      setNuevoCopy("");
    } catch (error) {
      console.error("Error al guardar la noticia:", error);
      alert("Ocurrió un error al guardar la noticia.");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 20 }}>
      <h3>Indexar Noticias en Pinecone</h3>
      <div>
        <label>Noticia: </label>
        <input
          type="text"
          value={nuevaNoticia}
          onChange={(e) => setNuevaNoticia(e.target.value)}
          style={{ marginBottom: 8, width: "300px" }}
          placeholder="Título o resumen de la noticia"
        />
      </div>
      <div>
        <label>Copy: </label>
        <input
          type="text"
          value={nuevoCopy}
          onChange={(e) => setNuevoCopy(e.target.value)}
          style={{ marginBottom: 8, width: "300px" }}
          placeholder="Copy asociado"
        />
      </div>
      <button onClick={indexarNoticia}>Guardar en Pinecone</button>
    </div>
  );
}

export default IndexarNoticias;
