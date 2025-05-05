import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-blue-500 shadow-md">
      <div className="flex items-center gap-2">
        <Link   to="/"><span className="text-white text-xl font-bold">SkyReserve</span></Link>
      </div>
      <div className="flex gap-4">
        <Link to="/" className="text-white hover:underline">Flights</Link>
        <Link to="/register" className="text-white hover:underline">Register</Link>
        <Link to="/login" className="text-white hover:underline">Login</Link>
        <Link to="/admin/dashboard" className="text-white hover:underline">Admin</Link>

      </div>
    </nav>
  );
}

export default Navbar;
