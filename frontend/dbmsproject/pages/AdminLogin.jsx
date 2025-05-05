// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    availableSeats: '',
    price: ''
  });

  const token = localStorage.getItem('adminToken');

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flights');
      setFlights(res.data);
    } catch (err) {
      toast.error('Failed to fetch flights');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/flights', form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flight added');
      setForm({ flightNumber: '', origin: '', destination: '', departureTime: '', arrivalTime: '', availableSeats: '', price: '' });
      fetchFlights();
    } catch (err) {
      toast.error('Failed to add flight');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flights/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Flight deleted');
      fetchFlights();
    } catch (err) {
      toast.error('Failed to delete flight');
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h1>
      <form onSubmit={handleSubmit} className="grid gap-4 bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            type="text"
            name={key}
            value={value}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition-colors"
        >
          Add Flight
        </button>
      </form>

      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Existing Flights</h2>
        {flights.length === 0 ? (
          <p className="text-gray-600">No flights available.</p>
        ) : (
          <ul className="space-y-4">
            {flights.map(flight => (
              <li
                key={flight.id}
                className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <div>
                  <p><strong>{flight.flightNumber}</strong>: {flight.origin} → {flight.destination}</p>
                  <p className="text-sm text-gray-500">Departs: {flight.departureTime} | Arrives: {flight.arrivalTime}</p>
                </div>
                <button
                  onClick={() => handleDelete(flight.id)}
                  className="text-white bg-red-500 hover:bg-red-700 px-3 py-1 rounded-xl"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
