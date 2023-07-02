import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import {Mainlogo}  from '../../images/Mainlogo';
import {Link, useNavigate} from 'react-router-dom';

export const LoginForm = ({currentUser, setCurrentUser}) => {
    const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password,
      });

      const obj = response.data;

      if (obj) {
        localStorage.setItem('token', obj.token)
        localStorage.setItem('username', username)
        setCurrentUser(username)
        navigate('/rate')
      } 
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid username or password');
    }

    setLoading(false);
  };

  return (
        <div className="login-container">
        <div className ="page-title">
            <h1> Welcome to Rate<span style={{color: 'lightgreen'}}>My</span>Classes</h1>
          { <Mainlogo />}
        </div>
      <div className="login-form-container">
        <h2 className="login-heading" style={{marginLeft: '55px'}}>Log In to the website</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <input
            type="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Email address or username"
            className="login-input"
            required
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
            className="login-input"
            required
          />
            <button onClick={handleLogin} type="submit" className="login-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          {error && <div className="login-error">{error}</div>}
         
          <hr className="login-divider" />
          <Link to='/register' className="create-account-button">Create New Account </Link>
        </form>
      </div>
    </div>
  );
};

