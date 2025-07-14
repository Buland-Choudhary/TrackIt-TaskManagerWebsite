import React from "react";
import ReactDOM from "react-dom/client";  // Updated import for React 18
import "./styles.css";
import App from "./App";
import 'font-awesome/css/font-awesome.min.css';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(  // Use the new render method for React 18
  <AuthProvider>
    <App />
  </AuthProvider>
);
