import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../css/Login.css';
import logoImage from '../assets/img/favicon.png';  

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/Login', { 
        usuario: username, 
        senha: password,
      });

      // Verifica se o login foi bem-sucedido
      if (response.status === 200) {
        navigate('/Home');
      }
    } catch (error) {
       setErrorMessage('Usuário ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className='g'>Gestão de Entregas</h2>
        <p>Casa zé Rissi</p>

        <div className='logo-image'> 
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input 
              type="text"  
              id="username" 
              placeholder="Digite seu nome de usuário" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Digite sua senha" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
