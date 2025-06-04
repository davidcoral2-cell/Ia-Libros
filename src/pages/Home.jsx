import React from 'react';
import Login from '../components/Login';

export default function Home() {
  return (
    <div>
      <h1>Bienvenido a la Recomendadora de Libros 📚</h1>
      <div style={{ maxWidth: 400, margin: '0 auto' }}>
        <Login onLogin={() => window.location.href = "/dashboard"} />
      </div>
    </div>
  );
}
