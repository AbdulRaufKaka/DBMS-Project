import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FlightsPage = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check for token
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Fetch flights
    const fetchFlights = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/flights');
        setFlights(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching flights:', error);
        setError('Failed to load flights. Please try again later.');
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleBookFlight = async (flightId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      toast.error('Please login to book a flight');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/flights/${flightId}/book`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      toast.success('Flight booked successfully!');
      console.log('Booking response:', response.data);

      // Refresh flights
      const updatedFlights = await axios.get('http://localhost:5000/api/flights');
      setFlights(updatedFlights.data);
    } catch (error) {
      console.error('Error booking flight:', error);
      toast.error(error.response?.data?.error || 'Failed to book flight');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading flights...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center min-h-screen flex items-center justify-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-center text-3xl font-bold text-blue-600 py-6">Available Flights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <div key={flight.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <h2 className="text-2xl font-bold mb-2">{flight.flightNumber}</h2>
              {flight.airline && <p className="text-gray-600 mb-4">{flight.airline}</p>}

              <div className="flex justify-between mb-2">
                <span className="font-semibold">From:</span>
                <span>{flight.origin}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">To:</span>
                <span>{flight.destination}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Departure:</span>
                <span>{flight.departureTime ? new Date(flight.departureTime).toLocaleString() : 'N/A'}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Arrival:</span>
                <span>{flight.arrivalTime ? new Date(flight.arrivalTime).toLocaleString() : 'N/A'}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="font-semibold">Available Seats:</span>
                <span>{flight.availableSeats}</span>
              </div>

              <div className="mt-4 mb-6 text-center">
                <span className="text-2xl font-bold text-green-600">
                  Rs{flight.price && parseFloat(flight.price).toFixed(2)}
                </span>
              </div>

              <button
                onClick={() => handleBookFlight(flight.id)}
                className={`mt-4 w-full py-2 rounded transition text-white ${
                  flight.availableSeats < 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
                disabled={flight.availableSeats < 1 || !isLoggedIn}
              >
                {!isLoggedIn
                  ? 'Login to Book'
                  : flight.availableSeats < 1
                  ? 'Sold Out'
                  : 'Book Now'}
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600 text-lg">No flights available at the moment.</p>
        )}
      </div>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default FlightsPage;
