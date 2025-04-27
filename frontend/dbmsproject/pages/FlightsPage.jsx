import { useState, useEffect } from 'react';
import axios from 'axios';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights');
        setFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold text-blue-600 py-6">Available Flights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-2">{flight.airlineName}</h2>
              <p className="text-gray-700">From: {flight.departure}</p>
              <p className="text-gray-700">To: {flight.destination}</p>
              <p className="text-gray-700">Date: {new Date(flight.date).toLocaleDateString()}</p>
              <p className="text-gray-700">Time: {flight.time}</p>
              <p className="text-gray-700">Price: ₹{flight.price}</p>
              <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Book Now</button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600 text-lg">No flights available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default FlightsPage;
