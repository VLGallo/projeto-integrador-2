import React from 'react';
import '../css/Home.css';
import backpc from '../assets/img/backpc.png'; // Import direto da imagem

function Home() {
  return (
    <div>
      <div className="Background" style={{ backgroundImage: `url(${backpc})` }}>
        <h1 className='Titulo3'>Gestão de Entregas</h1>
      </div>
    </div>
  );
}

export default Home;
