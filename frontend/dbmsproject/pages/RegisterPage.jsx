import { useState } from 'react';
import axios from 'axios';

function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/register', formData);
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Register</h2>
        <input type="text" name="name" placeholder="Name" onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400" required />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
