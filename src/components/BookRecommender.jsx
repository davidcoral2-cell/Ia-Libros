// src/components/BookRecommender.jsx
import { useState } from "react";

export default function BookRecommender() {
  const [inputBooks, setInputBooks] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRecommendations = async () => {
    setLoading(true);
    const prompt = `Recomiéndame 5 libros similares a estos: ${inputBooks}. Solo dame los títulos, autor y una línea de descripción.`;

    const response = await fetch("https://ai.hackclub.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "No hubo respuesta.";
    const lines = content.split("\n").filter((l) => l.trim() !== "");

    setRecommendations(lines);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Recomendador de libros con IA 📚</h2>
      <textarea
        rows="4"
        placeholder="Escribe algunos libros que te gusten..."
        value={inputBooks}
        onChange={(e) => setInputBooks(e.target.value)}
        style={{ width: "100%", padding: 10 }}
      />
      <button onClick={getRecommendations} disabled={loading}>
        {loading ? "Buscando..." : "Recomiéndame libros"}
      </button>

      <div style={{ marginTop: 20 }}>
        {recommendations.map((rec, idx) => (
          <p key={idx}>👉 {rec}</p>
        ))}
      </div>
    </div>
  );
}
