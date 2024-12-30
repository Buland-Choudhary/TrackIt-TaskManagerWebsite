import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import apiUrl from '../config';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const { token } = useContext(AuthContext); // Access token from AuthContext
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiUrl}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks.');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await axios.post(`${apiUrl}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks([...tasks, { ...task, id: response.data.taskId }]);
    } catch (err) {
      setError('Failed to create task.');
    }
  };

  const updateTask = async (taskId, updates) => {
    try {
      await axios.put(`${apiUrl}/tasks`, { taskId, ...updates }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.map((task) => (task.id === taskId ? { ...task, ...updates } : task)));
    } catch (err) {
      setError('Failed to update task.');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`${apiUrl}/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task.');
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
