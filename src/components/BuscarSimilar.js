import { useState } from "react";
import axios from "axios";

function BuscarSimilar() {
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState(null);

  const backendUrl = "https://news-copy-backend.onrender.com";

  const buscarSimilar = async () => {
    try {
      const resp = await axios.post(`${backendUrl}/buscar_similar`, {
        texto: consulta,
      });
      setResultado(resp.data);
    } catch (error) {
      console.error("Error al buscar la similitud:", error);
      alert("Ocurrió un error al buscar la similitud.");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: 10, marginTop: 20 }}>
      <h3>Búsqueda Semántica</h3>

      <input
        type="text"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder="Texto o noticia para buscar similitud"
        style={{ marginRight: 8, width: "300px" }}
      />
      <button onClick={buscarSimilar}>Buscar</button>

      {resultado && (
        <div style={{ marginTop: 10 }}>
          <p><strong>ID:</strong> {resultado.id}</p>
          <p><strong>Score:</strong> {resultado.score}</p>
          <p><strong>Noticia:</strong> {resultado.metadata?.noticia}</p>
          <p><strong>Copy:</strong> {resultado.metadata?.copy}</p>
        </div>
      )}
    </div>
  );
}

export default BuscarSimilar;
