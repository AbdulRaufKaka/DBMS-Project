import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (error) {
      alert('Login failed.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-purple-500">Login</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange}
          className="w-full p-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange}
          className="w-full p-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-purple-400" required />
        <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
