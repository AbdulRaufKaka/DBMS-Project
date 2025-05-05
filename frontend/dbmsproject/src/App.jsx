import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import RegisterPage from '../pages/RegisterPage';
// import LoginPage from '../pages/LoginPage';
// import FlightsPage from '../pages/FlightsPage';
// import Navbar from './components/Navbar';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage'
import FlightsPage from '../pages/FlightsPage'
import Navbar from '../component/Navbar'
import AdminDashboard from '../pages/AdminDashboard';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<FlightsPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;
