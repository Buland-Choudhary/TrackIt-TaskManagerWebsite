import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout } = useContext(AuthContext);  // Access user and logout from context
  const navigate = useNavigate();  // Initialize useNavigate hook

  const handleLogout = () => {
    logout();  // Call logout to clear user and token from context
    navigate('/login');  // Redirect to login page after logout
  };

  return (
    <header className="bg-blue-500 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-xl font-bold">
          <Link to="/">TrackIt</Link>
        </h1>
        <nav>
          {/* <Link to="/tasks" className="mr-4 hover:underline">
            Tasks
          </Link> */}
          {user ? (
            // If user is logged in, show "Logout" button
            <button
              onClick={handleLogout}  // Handle logout and redirect to login
              className="hover:underline"
            >
              Logout
            </button>
          ) : (
            // If no user is logged in, show "Login"
            <Link to="/login" className="hover:underline">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
