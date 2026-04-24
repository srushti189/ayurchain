import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:3001/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      setStatus('❌ ' + err.response?.data?.error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1>🌿 AyurChain</h1>
      <h2>Login</h2>
      <input placeholder="Email" type="email" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', width: '100%' }}>
        Login
      </button>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
      <p style={{ marginTop: '1rem' }}>No account? <Link to="/register">Register</Link></p>
    </div>
  );
}