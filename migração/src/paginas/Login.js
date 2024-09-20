import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Login.css';
import logoImage from '../assets/img/favicon.png';  

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Verificação de email e senha
    const validEmail = 'ste@br.com';
    const validPassword = 'senha123';

    if (email === validEmail && password === validPassword) {
      // Redirecionar para a página "Home" em caso de sucesso
      navigate('/Home');  // Adiciona a barra antes do caminho
    } else {
      // Exibir mensagem de erro em caso de falha
      setErrorMessage('Email ou senha incorretos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2 className='ge'>Gestão de Entregas!</h2>
        <p>Casa zé Rissi.</p>

        <div className='logo-image'> 
          <img src={logoImage} alt="Logo" className="logo-image" />
        </div>
        
      </div>
      <div className="login-right">
        <form className="login-form" onSubmit={handleLogin}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="Enter your password" 
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

