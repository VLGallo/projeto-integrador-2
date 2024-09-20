import React, { useState, useEffect } from 'react';
import '../css/Relatorio.css';

const RelatorioEntregas = () => {
  // Estados para gerenciar os dados da tabela (agora cada item tem 'entrega' e 'hora')
  const [dados, setDados] = useState({
    motoboyA: Array(4).fill({ entrega: "", hora: "" }),
    motoboyB: Array(4).fill({ entrega: "", hora: "" }),
    motoboyC: Array(4).fill({ entrega: "", hora: "" })
  });

  // Estado para armazenar o total de entregas
  const [totalEntregas, setTotalEntregas] = useState({
    motoboyA: 0,
    motoboyB: 0,
    motoboyC: 0,
    totalGeral: 0
  });

  // Carregar os dados do localStorage ao iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('dadosRelatorio');
    if (dadosSalvos) {
      setDados(JSON.parse(dadosSalvos));
    }
  }, []);

  // Função para salvar os dados no localStorage
  const salvarDados = () => {
    localStorage.setItem('dadosRelatorio', JSON.stringify(dados));
  };

  // Função para atualizar os dados da entrega e da hora
  const handleInputChange = (e, motoboy, index, field) => {
    const { value } = e.target;
    setDados((prevDados) => ({
      ...prevDados,
      [motoboy]: prevDados[motoboy].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Calcular o total de entregas para cada motoboy
  useEffect(() => {
    const calcularTotais = () => {
      const totalA = dados.motoboyA.filter(({ entrega }) => Boolean(entrega)).length;
      const totalB = dados.motoboyB.filter(({ entrega }) => Boolean(entrega)).length;
      const totalC = dados.motoboyC.filter(({ entrega }) => Boolean(entrega)).length;
      setTotalEntregas({
        motoboyA: totalA,
        motoboyB: totalB,
        motoboyC: totalC,
        totalGeral: totalA + totalB + totalC
      });
    };

    calcularTotais();
  }, [dados]);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 className='ge'>Relatório de Entregas</h2>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ margin: '20px 0' }}>
        <thead>
          <tr>
            <th>Motoboy A</th>
            <th>Motoboy B</th>
            <th>Motoboy C</th>
          </tr>
        </thead>
        <tbody>
          {Array(4)
            .fill(null)
            .map((_, i) => (
              <tr key={i}>
                <td>
                  <input
                    type="text"
                    placeholder="Entrega"
                    value={dados.motoboyA[i].entrega}
                    onChange={(e) => handleInputChange(e, 'motoboyA', i, 'entrega')}
                  />
                  <input
                    type="time"
                    value={dados.motoboyA[i].hora}
                    onChange={(e) => handleInputChange(e, 'motoboyA', i, 'hora')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Entrega"
                    value={dados.motoboyB[i].entrega}
                    onChange={(e) => handleInputChange(e, 'motoboyB', i, 'entrega')}
                  />
                  <input
                    type="time"
                    value={dados.motoboyB[i].hora}
                    onChange={(e) => handleInputChange(e, 'motoboyB', i, 'hora')}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Entrega"
                    value={dados.motoboyC[i].entrega}
                    onChange={(e) => handleInputChange(e, 'motoboyC', i, 'entrega')}
                  />
                  <input
                    type="time"
                    value={dados.motoboyC[i].hora}
                    onChange={(e) => handleInputChange(e, 'motoboyC', i, 'hora')}
                  />
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total: {totalEntregas.motoboyA} entregas</td>
            <td>Total: {totalEntregas.motoboyB} entregas</td>
            <td>Total: {totalEntregas.motoboyC} entregas</td>
          </tr>
          <tr>
            <td colSpan="3" style={{ textAlign: 'center' }}>
              Total Geral: {totalEntregas.totalGeral} entregas
            </td>
          </tr>
        </tfoot>
      </table>

      <button onClick={salvarDados} style={{ padding: '10px', backgroundColor: 'green', color: 'white' }}>
        Salvar Relatório
      </button>
    </div>
  );
};

export default RelatorioEntregas;
