import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate, Link } from 'react-router-dom';
import contractABI from '../contractABI.json';
import { css } from '../styles';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const STAGES = [
  { value: 'harvested', label: 'Harvested', icon: '🌱', desc: 'Raw herb collected from field' },
  { value: 'collected', label: 'Collected', icon: '🧺', desc: 'Gathered by collector' },
  { value: 'processed', label: 'Processed', icon: '⚗️', desc: 'Cleaned and prepared' },
  { value: 'manufactured', label: 'Manufactured', icon: '🏭', desc: 'Final product created' },
];

export default function AddBatch() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({ herbName: '', location: '', stage: 'harvested', notes: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }, []);

  const getLocation = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const coords = `${pos.coords.latitude.toFixed(4)},${pos.coords.longitude.toFixed(4)}`;
      setForm(f => ({ ...f, location: coords }));
    });
  };

  const handleSubmit = async () => {
    if (!form.herbName || !form.location) {
      setStatus('error:Please fill in herb name and location');
      return;
    }
    setLoading(true);
    setStatus('connecting');
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
      setStatus('submitting');
      const tx = await contract.addBatch(form.herbName, form.location, form.stage, form.notes);
      await tx.wait();
      setStatus('success');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setStatus('error:' + (err.reason || err.message));
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f0e8' }}>
      {/* Header */}
      <header style={{ background: '#1a3a2a', padding: '0 40px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', color: '#f5f0e8', fontWeight: 700 }}>🌿 AyurChain</span>
        </Link>
        {user && <span style={{ color: '#4a8c5c', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{user.name} · {user.role}</span>}
      </header>

      <main style={{ maxWidth: '600px', margin: '0 auto', padding: '48px 40px' }}>
        <div style={{ marginBottom: '32px' }}>
          <Link to="/" style={{ color: '#6b6b6b', fontSize: '13px', textDecoration: 'none' }}>← Back to Dashboard</Link>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', color: '#1a3a2a', marginTop: '12px' }}>Record New Batch</h1>
          <p style={{ color: '#6b6b6b', fontSize: '14px', marginTop: '8px' }}>This record will be permanently stored on the blockchain</p>
        </div>

        <div className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Herb Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a2a', display: 'block', marginBottom: '6px' }}>Herb Name *</label>
            <input className="input" placeholder="e.g. Ashwagandha, Tulsi, Neem"
              value={form.herbName}
              onChange={e => setForm({ ...form, herbName: e.target.value })} />
          </div>

          {/* Location */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a2a', display: 'block', marginBottom: '6px' }}>GPS Location *</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input className="input" placeholder="lat,long e.g. 23.2599,77.4126"
                value={form.location}
                onChange={e => setForm({ ...form, location: e.target.value })} />
              <button className="btn-secondary" onClick={getLocation} style={{ whiteSpace: 'nowrap', padding: '12px 16px' }}>
                📍 Auto
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#6b6b6b', marginTop: '4px' }}>Click Auto to use your current location</p>
          </div>

          {/* Stage */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a2a', display: 'block', marginBottom: '10px' }}>Supply Chain Stage *</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {STAGES.map(s => (
                <div key={s.value}
                  onClick={() => setForm({ ...form, stage: s.value })}
                  style={{
                    padding: '12px',
                    border: `1.5px solid ${form.stage === s.value ? '#1a3a2a' : '#e8e0cc'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    background: form.stage === s.value ? '#f0f7f2' : '#fff',
                    transition: 'all 0.15s',
                  }}>
                  <div style={{ fontSize: '20px', marginBottom: '4px' }}>{s.icon}</div>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1a3a2a' }}>{s.label}</div>
                  <div style={{ fontSize: '11px', color: '#6b6b6b', marginTop: '2px' }}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 500, color: '#1a3a2a', display: 'block', marginBottom: '6px' }}>Notes (optional)</label>
            <textarea className="input" placeholder="Any additional details about this batch..."
              rows={3} style={{ resize: 'vertical' }}
              onChange={e => setForm({ ...form, notes: e.target.value })} />
          </div>

          {/* Status messages */}
          {status === 'connecting' && <div style={{ padding: '12px', background: '#fffbeb', border: '1px solid #fde68a', borderRadius: '4px', fontSize: '13px', color: '#92400e' }}>🔗 Connecting to wallet...</div>}
          {status === 'submitting' && <div style={{ padding: '12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '4px', fontSize: '13px', color: '#1e40af' }}>⛓️ Writing to blockchain... please confirm in Rabby</div>}
          {status === 'success' && <div style={{ padding: '12px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '4px', fontSize: '13px', color: '#166534' }}>✅ Batch recorded on blockchain! Redirecting...</div>}
          {status.startsWith('error:') && <div style={{ padding: '12px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '4px', fontSize: '13px', color: '#991b1b' }}>❌ {status.replace('error:', '')}</div>}

          <button className="btn-primary" onClick={handleSubmit} disabled={loading}
            style={{ padding: '14px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Processing...' : 'Submit to Blockchain →'}
          </button>
        </div>
      </main>
    </div>
  );
}