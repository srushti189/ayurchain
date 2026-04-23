import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddBatch from './pages/AddBatch';
import Track from './pages/Track';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddBatch />} />
        <Route path="/track/:id" element={<Track />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;