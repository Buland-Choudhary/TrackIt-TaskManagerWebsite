import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskDashboard = () => {
  const { tasks, loading, error } = useContext(TaskContext);
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Dashboard</h1>
      <button
        onClick={() => setIsAdding(!isAdding)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
      >
        {isAdding ? 'Cancel' : 'Add Task'}
      </button>
      {isAdding && (
        <div className="mt-4">
          <TaskForm closeForm={() => setIsAdding(false)} />
        </div>
      )}
      {loading && <p className="text-center text-gray-500 mt-4">Loading tasks...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
