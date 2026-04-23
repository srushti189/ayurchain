import { useState } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import contractABI from '../contractABI.json';

const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

export default function AddBatch() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    herbName: '', location: '', stage: 'harvested', notes: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async () => {
    try {
      setStatus('Connecting to wallet...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      setStatus('Submitting to blockchain...');
      const tx = await contract.addBatch(
        form.herbName, form.location, form.stage, form.notes
      );
      await tx.wait();
      setStatus('✅ Batch added successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setStatus('❌ Error: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '500px' }}>
      <h1>Add New Batch</h1>
      <input placeholder="Herb Name" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, herbName: e.target.value })} />
      <input placeholder="Location (lat,long)" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, location: e.target.value })} />
      <select style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, stage: e.target.value })}>
        <option value="harvested">Harvested</option>
        <option value="collected">Collected</option>
        <option value="processed">Processed</option>
        <option value="manufactured">Manufactured</option>
      </select>
      <textarea placeholder="Notes" style={{ display: 'block', width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        onChange={e => setForm({ ...form, notes: e.target.value })} />
      <button onClick={handleSubmit} style={{ padding: '0.5rem 1rem' }}>
        Submit to Blockchain
      </button>
      {status && <p style={{ marginTop: '1rem' }}>{status}</p>}
    </div>
  );
}