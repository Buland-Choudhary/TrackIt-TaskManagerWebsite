// App.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';

// Lazy-loaded pages
const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const TaskPage = React.lazy(() => import('./pages/TaskPage'));

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Suspense fallback={<div className="text-center mt-4">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tasks" element={<TaskPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
