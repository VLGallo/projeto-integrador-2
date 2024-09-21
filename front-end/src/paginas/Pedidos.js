import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Pedidos.css'; 
import logoImage from '../assets/img/favicon.png';  
import pizzaIcon from '../assets/img/pizza.png';  

const Pedidos = () => {
  const [clientes, setClientes] = useState([]);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [itens, setItens] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Carregar clientes
  useEffect(() => {
    const carregarCliente = async () => {
      try {
        const response = await axios.get('http://localhost:8000/cliente');
        setClientes(response.data);
      } catch (error) {
        console.log('Erro ao carregar clientes:', error);
      }
    };
    carregarCliente();
  }, []);

  // Carregar produtos
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/produto');
        setProdutos(response.data);
      } catch (error) {
        console.log('Erro ao carregar produtos:', error);
      }
    };
    carregarProdutos();
  }, []);

  // Adicionar item
  const adicionarItem = () => {
    if (selectedProduct) {
      setItens((prevItens) => [...prevItens, selectedProduct]);
      setSelectedProduct('');
    }
  };

  // Remover item
  const removerItem = (index) => {
    const novosItens = [...itens];
    novosItens.splice(index, 1);
    setItens(novosItens);
  };

  // Salvar pedido
  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/pedido/add', {
        cliente: clienteSelecionado,
        produtos: itens,
        funcionario: 2, 
      });
      if (response.status >= 200 && response.status < 300) {
        setModalVisible(true); 
        setItens([]);
        setClienteSelecionado('');
        setEndereco('');
        setTelefone('');
      }
    } catch (error) {
      console.log('Erro ao salvar pedido:', error);
    }
  };

  return (
    <div className="pedidos-container">
      <div className="pedidos-form">
        <div className="form-header">
          <img src={pizzaIcon} alt="Pizza" className="pizza-icon" />
          <h1>Pedidos</h1>
        </div>
        <form onSubmit={handleSalvar}>
          <div className="form-group">
            <label htmlFor="cliente">Cliente</label>
            <select
              id="cliente"
              value={clienteSelecionado}
              onChange={(e) => setClienteSelecionado(e.target.value)}
            >
              <option value="">Selecione o cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              placeholder="Digite o endereço"
            />
          </div>

          <div className="form-group">
            <label htmlFor="telefone">Telefone</label>
            <input
              type="text"
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="Digite o telefone"
            />
          </div>

          <div className="form-group">
            <label htmlFor="itens">Itens</label>
            <div className="itens-group">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option key={produto.id} value={produto.id}>
                    {produto.nome}
                  </option>
                ))}
              </select>
              <button type="button" className="itens-button" onClick={adicionarItem}>
                +
              </button>
            </div>
            <ul>
              {itens.map((item, index) => (
                <li key={index}>
                  {produtos.find((produto) => produto.id === item)?.nome || item}
                  <button type="button" onClick={() => removerItem(index)}>
                    -
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="form-buttons">
            <button type="submit" className="save-button">
              Salvar
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => {
                setClienteSelecionado('');
                setItens([]);
              }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pedidos;
