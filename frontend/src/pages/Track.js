import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icon broken in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

export default function Track() {
  const { id } = useParams();
  const [batch, setBatch] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/batches/${id}`)
      .then(res => setBatch(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!batch) return <p style={{ padding: '2rem' }}>Loading...</p>;

  // Parse "lat,long" string into numbers
  const coords = batch.location.split(',').map(Number);
  const validCoords = coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '700px' }}>
      <h1>🌿 Batch #{batch.id} — {batch.herbName}</h1>

      <div style={{
        background: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '1rem',
        marginBottom: '1.5rem'
      }}>
        <p><b>Stage:</b> {batch.stage}</p>
        <p><b>Location:</b> {batch.location}</p>
        <p><b>Added By:</b> {batch.addedBy}</p>
        <p><b>Timestamp:</b> {batch.timestamp}</p>
        <p><b>Notes:</b> {batch.notes}</p>
      </div>

      {validCoords && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h3>📍 Collection Location</h3>
          <MapContainer
            center={coords}
            zoom={10}
            style={{ height: '350px', width: '100%', borderRadius: '8px' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={coords}>
              <Popup>
                {batch.herbName} — {batch.stage} <br />
                {batch.location}
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      )}

      <div>
        <h3>QR Code for this batch:</h3>
        <QRCodeSVG value={`http://localhost:3000/track/${id}`} size={200} />
        <p style={{ fontSize: '12px', color: '#888', marginTop: '0.5rem' }}>
          Scan to verify authenticity
        </p>
      </div>
    </div>
  );
}