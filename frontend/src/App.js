import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddBatch from './pages/AddBatch';
import Track from './pages/Track';
import Login from './pages/Login';
import Register from './pages/Register';

function PrivateRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (!token || !user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/track/:id" element={<Track />} />
        <Route path="/add" element={
          <PrivateRoute roles={['farmer', 'collector', 'processor', 'manufacturer']}>
            <AddBatch />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;