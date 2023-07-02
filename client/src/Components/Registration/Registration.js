import React, { useState } from 'react';
import './Registration.css';
import { Mainlogo } from '../../images/Mainlogo';
import {Link} from 'react-router-dom';
import axios from 'axios';

export function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:4000/api/register', {
        username,
        password,
      });

      if (response.status === 201) {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An error occurred during registration.');
    }

    setLoading(false);
  };

  return (
    <div className='login-container'>
          <div className ="page-title">
            <h1> Register to Rate<span style={{color: 'lightgreen'}}>My</span>Classes</h1>
          { <Mainlogo />}
        </div>
    <div className="login-form-container">
    {isRegistered ? (
          <div>
            <h2 style={{ marginLeft: '15px' }}>Registration Successful!</h2>
            <Link style={{ marginLeft: '70px' }} to='/'> Go back to login page </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className='login-form'>
            <label>
              Username:
              <input type="text" value={username} onChange={handleUsernameChange} required className="login-input" />
            </label>
            <br />
            <label>
              Password:
              <input type="password" value={password} onChange={handlePasswordChange} required className="login-input" style={{ marginLeft: '11px' }} />
            </label>
            <br />
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <div className="registration-error">{error}</div>}
          </form>
        )}
    </div>
    </div>
  );
}

export default RegistrationPage;
