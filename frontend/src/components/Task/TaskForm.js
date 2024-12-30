import React, { useState, useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskForm = ({ existingTask, closeForm }) => {
  const { createTask, updateTask } = useContext(TaskContext);
  const [task, setTask] = useState(
    existingTask || { title: '', description: '', status: 'Pending', priority: 'Medium', due_date: '' }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingTask) {
      updateTask(existingTask.id, task);
    } else {
      createTask(task);
    }
    closeForm && closeForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 shadow-lg rounded-md border border-gray-200"
    >
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Priority</label>
        <select
          value={task.priority}
          onChange={(e) => setTask({ ...task, priority: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Due Date</label>
        <input
          type="date"
          value={task.due_date}
          onChange={(e) => setTask({ ...task, due_date: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow-md"
        >
          {existingTask ? 'Update Task' : 'Add Task'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
