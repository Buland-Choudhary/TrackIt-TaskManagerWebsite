import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TaskPage from './pages/TaskPage';
import Header from './components/Header';  // Import Header

function App() {
  return (
    <Router>
      <div>
        <Header /> {/* Include the Header component */}
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect root to /login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tasks" element={<TaskPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
