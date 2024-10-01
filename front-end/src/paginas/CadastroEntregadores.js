import React, { useState } from 'react';
import axios from 'axios';
import '../css/CE.css'; // Importar o arquivo CSS para os estilos

const CadastroEntregadores = () => {
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [placa, setPlaca] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleCadastro = async (e) => {
    e.preventDefault(); // Evitar reload da página
    if (nome && telefone && placa) {
      try {
        const response = await axios.post('http://localhost:8000/motoboy/add', {
          nome,
          telefone,
          placa,
          funcionario: 1, // Exemplo de ID do funcionário
        });

        if (response.status === 201) {
          alert('Entregador(a) cadastrado(a) com sucesso!');
          // Limpar os campos após o cadastro
          setNome('');
          setTelefone('');
          setPlaca('');
        }
      } catch (error) {
        console.error('Erro ao cadastrar entregador:', error);
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };

  const handleCancelar = () => {
    setNome('');
    setTelefone('');
    setPlaca('');
  };

  return (
    <div className="corpo">
      <h2 className="ge">Cadastro de Entregadores</h2>

      <form onSubmit={handleCadastro}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            placeholder="Nome do Entregador"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input
            type="text"
            placeholder="Telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Placa</label>
          <input
            type="text"
            placeholder="Número da Placa"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="button salvar">
            Salvar
          </button>
          <button type="button" className="button cancelar" onClick={handleCancelar}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CadastroEntregadores;
