import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';

import Login from './paginas/Login'; 
import Home from './paginas/Home'; 
import Pedidos from './paginas/Pedidos'; 
import Atribuicao from './paginas/Atribuicao'; 
import Relatorio from './paginas/Relatorio'; 
import Navbar from './Componentes/Navbar';
import CadastroEntregadores from './paginas/CadastroEntregadores'; 

function App() {
  // Estado para controlar o tema
  const [darkMode, setDarkMode] = useState(false);

  // Função para alternar entre dark mode e light mode
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <BrowserRouter>
        <Navbar />

        {/* A bolinha no topo que troca o tema ao ser clicada */}
        <div className="top-ball" onClick={toggleTheme}></div>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Pedidos' element={<Pedidos />} />
          <Route path='/Atribuicao' element={<Atribuicao />} />
          <Route path='/Relatorio' element={<Relatorio />} />
          <Route path='/CadastroEntregadores' element={<CadastroEntregadores />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
