

import React from 'react';
import { Grid, Button } from '@mui/material';
import '../css/Relatorio.css';

const RelatorioEntregas = () => {
  return (
    <div className="container">
      {/* Título */}
      <h1 className="titulo">RELATÓRIO DE ENTREGAS</h1>

      {/* Corpo Principal */}
      <div className="main-content">
        {/* Tabela de Entregas */}
        <table className="delivery-table">
          <thead>
            <tr>
              <th>Motoboy A</th>
              <th>Motoboy B</th>
              <th>Motoboy C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Pedido 1<br/>Hora</td>
              <td>Pedido 4<br/>Hora</td>
              <td>Pedido 3<br/>Hora</td>
            </tr>
            <tr>
              <td>Pedido 12<br/>Hora</td>
              <td>Pedido 5<br/>Hora</td>
              <td>Pedido 13<br/>Hora</td>
            </tr>
            <tr>
              <td>Pedido 6<br/>Hora</td>
              <td></td>
              <td>Pedido 11<br/>Hora</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td>Pedido 8<br/>Hora</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>04 entregas</td>
              <td>02 entregas</td>
              <td>05 entregas</td>
            </tr>
            <tr>
              <td colSpan="3">Total: 11 entregas</td>
            </tr>
          </tfoot>
        </table>

       
        
      </div>

      
    </div>
  );
};

export default RelatorioEntregas;
