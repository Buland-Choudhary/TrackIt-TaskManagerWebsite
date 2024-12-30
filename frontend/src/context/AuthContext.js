import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import apiUrl from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state with values from localStorage if available
  const [user, setUser] = useState(localStorage.getItem('user')); // Get user info from localStorage
  const [token, setToken] = useState(localStorage.getItem('token')); // Get token from localStorage

  useEffect(() => {
    // Set the Authorization header if token exists
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, {
        name,
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      setUser(email); // Store email as user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', email); // Save user info in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, {
        email,
        password,
      });
      const { token } = response.data;
      setToken(token);
      setUser(email); // Set email as user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', email); // Save user info in localStorage
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user'); // Clear user info from localStorage
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
