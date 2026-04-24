import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'farmer' });
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3001/auth/register', form);
      setStatus('✅ Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setStatus('❌ ' + err.response?.data?.error);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h1>🌿 AyurChain</h1>
      <h2>Create Account</h2>
      <input placeholder="Full Name" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" type="email" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, password: e.target.value })} />
      <select style={{ display: 'block', width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, role: e.target.value })}>
        <option value="farmer">Farmer</option>
        <option value="collector">Collector</option>
        <option value="processor">Processor</option>
        <option value="manufacturer">Manufacturer</option>
        <option value="consumer">Consumer</option>
      </select>
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem', width: '100%' }}>
        Register
      </button>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
      <p style={{ marginTop: '1rem' }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}