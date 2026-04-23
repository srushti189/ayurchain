import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';

export default function Track() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/batches/${id}`)
      .then(res => setBatch(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!batch) return <p style={{ padding: '2rem' }}>Loading...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>🌿 Batch #{batch.id} — {batch.herbName}</h1>
      <p><b>Stage:</b> {batch.stage}</p>
      <p><b>Location:</b> {batch.location}</p>
      <p><b>Added By:</b> {batch.addedBy}</p>
      <p><b>Timestamp:</b> {batch.timestamp}</p>
      <p><b>Notes:</b> {batch.notes}</p>
      <hr />
      <h3>QR Code for this batch:</h3>
      <QRCodeSVG value={`http://localhost:3000/track/${id}`} size={200} />
    </div>
  );
}