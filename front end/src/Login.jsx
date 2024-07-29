import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import LoadingScreen from './LoadingScreen';

const Login = ({ onSwitchForm }) => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if(formData.username === ''){
      alert("Enter Valid Username");
    }
    else if(formData.password === ''){
      alert("Enter Valid Password");
    }
    else{
      try {
      
        const response = await axios.post('http://localhost:8080/api/users/login', null, {
          params: {
            username: formData.username,
            password: formData.password
          }
        });
        
        localStorage.setItem('userdetails', response.data);
        localStorage.setItem('username',formData.username );
        navigate('/buy', { replace: true });
      } catch (error) {
        //console.error('Login failed:', error.message);
        setError('Invalid username or password. Please try again.'); // Set an error message
      }
    }
    
  };

  return (
    <div>
      <h2 style={{color:'white'}}>Welcome To Auction !!!</h2>
    <div className='first'>

      {loading && <LoadingScreen />}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Login</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there is an error */}
        <p>
          Don't have an account? Click here to{' '}
          <button type="button" onClick={() => onSwitchForm('register')}>
            Register
          </button>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Login;
