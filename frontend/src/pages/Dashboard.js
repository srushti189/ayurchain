import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/batches')
      .then(res => setBatches(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>🌿 AyurChain Dashboard</h1>
      <Link to="/add">
        <button style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}>
          + Add New Batch
        </button>
      </Link>
      {batches.length === 0 && <p>No batches recorded yet.</p>}
      {batches.map(batch => (
        <div key={batch.id} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          marginBottom: '1rem'
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