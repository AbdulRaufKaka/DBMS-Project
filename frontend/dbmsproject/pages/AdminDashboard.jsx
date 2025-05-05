// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureTime: '',  // Changed back to departureTime to match database model
    arrivalTime: '',    // Changed back to arrivalTime to match database model
    availableSeats: '',
    price: '',
    airline: ''
  });

  const token = localStorage.getItem('adminToken');

  const fetchFlights = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/flights');
      setFlights(res.data);
    } catch (err) {
      console.error('Error fetching flights:', err);
      toast.error('Failed to fetch flights');
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a copy of the form data to prepare it for submission
      const flightData = {
        ...form,
        price: parseFloat(form.price),
        availableSeats: parseInt(form.availableSeats, 10)
      };
      
      console.log('Submitting flight data:', flightData);
      
      const response = await axios.post('http://localhost:5000/api/flights', flightData);
      
      console.log('Server response:', response.data);
      toast.success('Flight added successfully');
      
      // Reset form
      setForm({
        flightNumber: '',
        origin: '',
        destination: '',
        departureTime: '',
        arrivalTime: '',
        availableSeats: '',
        price: '',
        airline: ''
      });
      
      // Refresh flight list
      fetchFlights();
    } catch (err) {
      console.error('Error adding flight:', err.response?.data || err.message);
      toast.error(err.response?.data?.error || 'Failed to add flight');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/flights/${id}`);
      toast.success('Flight deleted');
      fetchFlights();
    } catch (err) {
      console.error('Error deleting flight:', err);
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Flight Number</label>
            <input
              type="text"
              name="flightNumber"
              value={form.flightNumber}
              onChange={handleChange}
              placeholder="e.g. AA123"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Airline</label>
            <input
              type="text"
              name="airline"
              value={form.airline}
              onChange={handleChange}
              placeholder="e.g. American Airlines"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
            <input
              type="text"
              name="origin"
              value={form.origin}
              onChange={handleChange}
              placeholder="e.g. LAX"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="e.g. JFK"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Departure Time</label>
            <input
              type="datetime-local"
              name="departureTime"
              value={form.departureTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Arrival Time</label>
            <input
              type="datetime-local"
              name="arrivalTime"
              value={form.arrivalTime}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Seats</label>
            <input
              type="number"
              name="availableSeats"
              value={form.availableSeats}
              onChange={handleChange}
              placeholder="e.g. 120"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min="1"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="e.g. 299.99"
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              min="0"
              step="0.01"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors mt-4"
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
                  <p className="text-sm text-gray-500">
                    Departs: {new Date(flight.departureTime).toLocaleString()} | 
                    {flight.arrivalTime && ` Arrives: ${new Date(flight.arrivalTime).toLocaleString()}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    Price: ${flight.price} | Available Seats: {flight.availableSeats}
                  </p>
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