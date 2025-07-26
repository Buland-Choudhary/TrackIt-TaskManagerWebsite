// App.js
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import { TaskProvider } from './context/TaskContext';  // <-- moved here
import VisitNotifier from './components/VisitNotifier';

const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const RegisterPage = React.lazy(() => import('./pages/RegisterPage'));
const TaskPage = React.lazy(() => import('./pages/TaskPage'));

function App() {
  return (
    <Router>
      <div>
        <Header />
        <VisitNotifier /> {/* <-- Notification trigger */}
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            {/* Only wrap tasks with TaskProvider */}
            <Route
              path="/tasks"
              element={
                <TaskProvider>
                  <TaskPage />
                </TaskProvider>
              }
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
