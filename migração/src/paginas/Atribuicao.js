import React, { useState, useEffect } from "react";
import axios from "axios";
import fundo from '../assets/img/bg-opaco.png'; // Imagem de fundo
import '../css/Atribuicao.css';

function Atribuicao() {
  const [pedido, setPedido] = useState("");
  const [selectedMotoboy, setSelectedMotoboy] = useState("");
  const [selectedPedido, setSelectedPedido] = useState("");
  const [motoboys, setMotoboys] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedidos, setSelectedPedidos] = useState([]);

  useEffect(() => {
    // Carrega motoboys
    const carregarMotoboys = async () => {
      try {
        const response = await axios.get("http://localhost:8000/motoboy");
        setMotoboys(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    // Carrega pedidos
    const carregarPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/pedido");
        setPedidos(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    carregarMotoboys();
    carregarPedidos();
  }, []);

  const handleAtribuicao = async () => {
    for (let i = 0; i < selectedPedidos.length; i++) {
      try {
        const response = await axios.put(
          `http://localhost:8000/pedido/${selectedPedidos[i]}/atribuir-motoboy/${selectedMotoboy}`
        );
        alert("Pedido atribuído com sucesso!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const adicionarPedido = () => {
    if (selectedPedido) {
      setSelectedPedidos([...selectedPedidos, selectedPedido]);
      setSelectedPedido("");
    }
  };

  const removerPedido = (index) => {
    const novosPedidos = [...selectedPedidos];
    novosPedidos.splice(index, 1);
    setSelectedPedidos(novosPedidos);
  };

  const handleCancelar = () => {
    setSelectedPedidos([]);
    setSelectedMotoboy("");
  };

  return (
    <div className="atribuicao-container" style={{ backgroundImage: `url(${fundo})` }}>
      <div className="atribuicao-form">
        <h1>Atribuição de Pedidos</h1>

        <form>
          {/* Campo de Motoboy */}
          <div className="form-group">
            <label htmlFor="motoboy">Motoboy</label>
            <select
              id="motoboy"
              value={selectedMotoboy}
              onChange={(e) => setSelectedMotoboy(e.target.value)}
            >
              <option value="">Selecione o motoboy</option>
              {motoboys.map((motoboy) => (
                <option key={motoboy.id} value={motoboy.id}>
                  {motoboy.nome}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de Pedidos Selecionados */}
          <div className="form-group">
            <label htmlFor="pedido">Pedidos Selecionados</label>
            <ul>
              {selectedPedidos.map((pedido, index) => (
                <li key={index}>
                  Pedido ID: {pedido}
                  <button type="button" onClick={() => removerPedido(index)}>
                    Remover
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Adicionar Novo Pedido */}
          <div className="form-group">
            <label htmlFor="pedido">Adicionar Pedido</label>
            <select
              id="pedido"
              value={selectedPedido}
              onChange={(e) => setSelectedPedido(e.target.value)}
            >
              <option value="">Selecione o pedido</option>
              {pedidos.map((pedido) => (
                <option key={pedido.id} value={pedido.id}>
                  {pedido.id}
                </option>
              ))}
            </select>
            <button type="button" onClick={adicionarPedido}>
              Adicionar
            </button>
          </div>

          {/* Botões de Ação */}
          <div className="form-buttons">
            <button type="button" className="assign-button" onClick={handleAtribuicao}>
              Atribuir
            </button>
            <button type="button" className="cancel-button" onClick={handleCancelar}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Atribuicao;
