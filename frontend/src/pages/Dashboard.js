import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    axios.get('http://localhost:3001/batches')
      .then(res => setBatches(res.data))
      .catch(err => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>🌿 AyurChain Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {user && <span style={{ fontSize: '14px', color: '#555' }}>👤 {user.name} ({user.role})</span>}
          {user
            ? <button onClick={logout} style={{ padding: '0.4rem 0.8rem' }}>Logout</button>
            : <Link to="/login"><button style={{ padding: '0.4rem 0.8rem' }}>Login</button></Link>
          }
        </div>
      </div>

      {user && ['farmer', 'collector', 'processor', 'manufacturer'].includes(user.role) && (
        <Link to="/add">
          <button style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>+ Add New Batch</button>
        </Link>
      )}

      {user?.role === 'consumer' && (
        <p style={{ color: '#888', marginBottom: '1rem' }}>
          You can view and verify batches. Scan a QR code or browse below.
        </p>
      )}

      {batches.length === 0 && <p>No batches recorded yet.</p>}
      {batches.map(batch => (
        <div key={batch.id} style={{
          border: '1px solid #ccc', borderRadius: '8px',
          padding: '1rem', marginBottom: '1rem'
        }}>
          <h3>#{batch.id} — {batch.herbName}</h3>
          <p><b>Stage:</b> {batch.stage}</p>
          <p><b>Location:</b> {batch.location}</p>
          <p><b>Time:</b> {batch.timestamp}</p>
          <p><b>Notes:</b> {batch.notes}</p>
          <Link to={`/track/${batch.id}`}>🔍 Track this batch</Link>
        </div>
      ))}
    </div>
  );
}