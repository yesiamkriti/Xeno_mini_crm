import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { useState } from 'react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleGoogleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    const res = await axios.post('http://localhost:5000/api/auth/google', {
      token: credentialResponse.credential,
    });

    localStorage.setItem('token', res.data.token);
    onLogin(decoded);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      localStorage.setItem('token', res.data.token);
      onLogin(res.data.user); // adjust based on API response
    } catch (error) {
      alert('Login failed: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Xeno CRM Login</h2>

        <form onSubmit={handleFormSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Login</button>
        </form>

        <div className="divider">or</div>

        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert('Google Login failed')}
        />
      </div>
    </div>
  );
};

export default Login;
