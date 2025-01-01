import React, { useState, useContext } from 'react'; 
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('sampleuser@example.com'); // Pre-filled email
  const [password, setPassword] = useState('samplepassword123'); // Pre-filled password
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      window.location.href = '/tasks'; // Redirect to task dashboard
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  const fillSampleCredentials = () => {
    setEmail('sampleuser@example.com');
    setPassword('SamplePassword123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 text-center">
          <p>
            Use the sample credentials below for easy access:
          </p>
          <p className="text-gray-800">
            Email: <strong>sampleuser@example.com</strong><br />
            Password: <strong>samplepassword123</strong>
          </p>
          <button
            onClick={fillSampleCredentials}
            className="mt-4 bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded"
          >
            Fill Sample Credentials
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
