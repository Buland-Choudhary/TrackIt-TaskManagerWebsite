// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Custom Hook to use Auth context

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call login function from AuthContext to authenticate
    const success = await login(email, password);
    if (success) {
      navigate('/tasks'); // Redirect to tasks page after login
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form>
          <input
            type="email"
            className="border p-2 mb-4 w-full"
            placeholder="Email"
          />
          <input
            type="password"
            className="border p-2 mb-4 w-full"
            placeholder="Password"
          />
          <button type="submit" className="bg-blue-500 text-white w-full py-2">
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
