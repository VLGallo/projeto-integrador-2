import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'; 
import './App.css';

import Login from './paginas/Login'; 
import Home from './paginas/Home'; 
import CadastroCliente from './paginas/CadastroCliente'; 
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
        {/* Renderiza a Navbar somente se não estiver na rota raiz ("/") */}
        <NavbarWrapper />

        {/* A bolinha no topo que troca o tema ao ser clicada */}
        <div className="top-ball" onClick={toggleTheme}></div>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/CadastroCliente' element={<CadastroCliente/>} />
          <Route path='/Pedidos' element={<Pedidos />} />
          <Route path='/Atribuicao' element={<Atribuicao />} />
          <Route path='/Relatorio' element={<Relatorio />} />
          <Route path='/CadastroEntregadores' element={<CadastroEntregadores />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// Componente que controla a exibição da Navbar
function NavbarWrapper() {
  const location = useLocation();

  // Verifica se a rota atual é '/', caso seja, não renderiza a Navbar
  if (location.pathname === '/') {
    return null;
  }

  // Se a rota não for '/', renderiza a Navbar normalmente
  return <Navbar />;
}

export default App;
