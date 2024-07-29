import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';
import LoadingScreen from './LoadingScreen';

const Register = ({ onSwitchForm }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    role: 'Buyer',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if(formData.username === ''){
      alert("Enter Valid Username");
    }
    else if(formData.password === ''){
      alert("Enter Valid Password");
    }
    else if(formData.email ===''){
      alert("Enter Valid Confirm Password");
    }
    else{
      setLoading(true);
      try {
        const response = await axios.post('http://localhost:8080/api/users/register', formData);
        localStorage.setItem('userdetails', response.data);
        localStorage.setItem('username',formData.username );
        navigate('/buy', { replace: true });
      } catch (error) {
        //console.error('Registration failed:', error.message);
        setError('Registration failed. Please try again.'); // Set an error message
      } finally{
        setLoading(false);
      }
    }
    
  };

  return (
    <div>
      <h2 style={{color:'white'}}>Welcome To Auction !!!</h2>
    <div className="first">
      {loading && <LoadingScreen />}
      <h2>User Registration</h2>
      <form onSubmit={handleRegister}>
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
        <label>
          Confirm Password:
          <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="Buyer">Buyer</option>
            <option value="Seller">Seller</option>
          </select>
        </label>
        <br />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>} {/* Display error message if there is an error */}
        <p>
          Already have an account? Click here to{' '}
          <button type='button' onClick={() => onSwitchForm('login')}>Login</button>
        </p>
      </form>
    </div>
    </div>
  );
};

export default Register;
