import React, { useState } from 'react';
import '../css/CadastroCliente.css';

const CadastroCliente = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    cep: '',
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dados do cliente cadastrados:', formData);
    // Aqui você pode implementar a lógica para enviar os dados para uma API, etc.
  };

  const handleCancel = () => {
    setFormData({
      nome: '',
      telefone: '',
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: ''
    });
  };

  return (
    <div className="container">
      <h1 className='ge'>Cadastro de Clientes</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>CEP</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Logradouro</label>
          <input
            type="text"
            name="logradouro"
            value={formData.logradouro}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Número</label>
            <input
              type="text"
              name="numero"
              value={formData.numero}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Complemento</label>
            <input
              type="text"
              name="complemento"
              value={formData.complemento}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Bairro</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleInputChange}
          />
        </div>

        <div className="buttons">
          <button type="submit" className="btn cadastrar">Cadastrar</button>
          <button type="button" className="btn cancelar" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>

     
    </div>
  );
};

export default CadastroCliente;
