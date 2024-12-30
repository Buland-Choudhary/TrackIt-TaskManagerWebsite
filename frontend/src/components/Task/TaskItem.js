import React, { useContext } from 'react';
import { TaskContext } from '../../context/TaskContext';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);

  const toggleStatus = () => {
    updateTask(task.id, { status: task.status === 'Pending' ? 'Done' : 'Pending' });
  };

  return (
    <li className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
      <h3 className="font-bold text-lg text-gray-700">{task.title}</h3>
      <p className="text-gray-600">{task.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Priority: <span className="font-medium">{task.priority}</span>
      </p>
      <p className="text-sm text-gray-500">
        Due: <span className="font-medium">{task.due_date}</span>
      </p>
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={toggleStatus}
          className={`px-3 py-1 rounded text-white ${
            task.status === 'Pending' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          Mark as {task.status === 'Pending' ? 'Done' : 'Pending'}
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
