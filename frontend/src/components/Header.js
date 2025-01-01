import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // Log the user out
    navigate('/login');  // Redirect to login page
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* TrackIt */}
        <h1
          onClick={handleLogout}  // Trigger logout when clicked
          className="text-3xl font-extrabold tracking-wider cursor-pointer"
        >
          🚀 TrackIt
        </h1>
        <nav>
          {user ? (
            // If user is logged in, show "Logout" button
            <button
              onClick={handleLogout}
              className="text-lg font-medium bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
            >
              Logout
            </button>
          ) : (
            // If no user is logged in, show "Login"
            <Link
              to="/login"
              className="text-lg font-medium bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-all"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
