import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { css } from '../styles';

export default function Dashboard() {
  const [batches, setBatches] = useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
    axios.get('http://localhost:3001/batches')
      .then(res => setBatches(res.data))
      .catch(err => console.error(err));
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const canAdd = user && ['farmer','collector','processor','manufacturer'].includes(user.role);

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8' }}>
      {/* Header */}
      <header style={{
        background: '#1a3a2a',
        padding: '0 40px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '24px' }}>🌿</span>
          <span style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '20px',
            color: '#f5f0e8',
            fontWeight: 700,
            letterSpacing: '0.5px'
          }}>AyurChain</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {user && (
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#f5f0e8', fontSize: '14px', fontWeight: 500 }}>{user.name}</div>
              <div style={{ color: '#4a8c5c', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{user.role}</div>
            </div>
          )}
          {user
            ? <button className="btn-secondary" onClick={logout} style={{ color: '#f5f0e8', borderColor: '#4a8c5c' }}>Logout</button>
            : <Link to="/login"><button className="btn-primary" style={{ background: '#c4622d' }}>Login</button></Link>
          }
        </div>
      </header>

      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a3a2a 0%, #2d5a3d 100%)',
        padding: '60px 40px',
        color: '#f5f0e8',
      }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ color: '#4a8c5c', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>
            Blockchain Traceability Platform
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '42px', marginBottom: '16px', lineHeight: 1.2 }}>
            From Root to Remedy
          </h1>
          <p style={{ color: '#a8c5b0', fontSize: '16px', maxWidth: '500px', lineHeight: 1.6 }}>
            Every herb. Every step. Immutably recorded on the blockchain for complete transparency and trust.
          </p>
          {canAdd && (
            <Link to="/add">
              <button className="btn-primary" style={{
                marginTop: '28px',
                background: '#c4622d',
                padding: '14px 28px',
                fontSize: '15px'
              }}>
                + Record New Batch
              </button>
            </Link>
          )}
          {user?.role === 'consumer' && (
            <p style={{ marginTop: '20px', color: '#a8c5b0', fontSize: '14px' }}>
              Browse batches below or scan a QR code to verify a product's authenticity.
            </p>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e8e0cc', padding: '20px 40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '40px' }}>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#1a3a2a', fontFamily: 'Playfair Display, serif' }}>{batches.length}</div>
            <div style={{ fontSize: '12px', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Total Batches</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#1a3a2a', fontFamily: 'Playfair Display, serif' }}>
              {new Set(batches.map(b => b.herbName)).size}
            </div>
            <div style={{ fontSize: '12px', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Herb Varieties</div>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#1a3a2a', fontFamily: 'Playfair Display, serif' }}>
              {new Set(batches.map(b => b.stage)).size}
            </div>
            <div style={{ fontSize: '12px', color: '#6b6b6b', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Supply Stages</div>
          </div>
        </div>
      </div>

      {/* Batches */}
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '24px', marginBottom: '24px', color: '#1a3a2a' }}>
          Supply Chain Records
        </h2>
        {batches.length === 0 && (
          <div className="card" style={{ textAlign: 'center', padding: '60px', color: '#6b6b6b' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🌱</div>
            <p style={{ fontSize: '16px' }}>No batches recorded yet.</p>
            {canAdd && <Link to="/add"><button className="btn-primary" style={{ marginTop: '16px' }}>Record First Batch</button></Link>}
          </div>
        )}
        <div style={{ display: 'grid', gap: '16px' }}>
          {batches.map(batch => (
            <div key={batch.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', color: '#6b6b6b', fontWeight: 500 }}>#{batch.id}</span>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#1a3a2a' }}>{batch.herbName}</h3>
                  <span className={`tag tag-${batch.stage}`}>{batch.stage}</span>
                </div>
                <div style={{ display: 'flex', gap: '24px', fontSize: '13px', color: '#6b6b6b' }}>
                  <span>📍 {batch.location}</span>
                  <span>🕐 {new Date(batch.timestamp).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  {batch.notes && <span>📝 {batch.notes}</span>}
                </div>
              </div>
              <Link to={`/track/${batch.id}`}>
                <button className="btn-secondary" style={{ whiteSpace: 'nowrap' }}>View & Verify →</button>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}