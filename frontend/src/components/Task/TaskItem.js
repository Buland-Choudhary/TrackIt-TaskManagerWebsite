import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskForm from './TaskForm';

const TaskItem = ({ task }) => {
  const { deleteTask, updateTask } = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);

  const toggleStatus = () => {
    updateTask(task.id, { status: task.status === 'Pending' ? 'Done' : 'Pending' });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  // Format the due date
  const formatDueDate = (isoString) => {
    if (!isoString) return 'No due date';
    const date = new Date(isoString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <li className="bg-white p-4 shadow-lg rounded-md border border-gray-200">
      {isEditing ? (
        <TaskForm existingTask={task} closeForm={handleSave} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-lg text-gray-700">{task.title}</h3>
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700"
              title="Edit Task"
            >
              ✏️
            </button>
          </div>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            Priority: <span className="font-medium">{task.priority}</span>
          </p>
          <p className="text-sm text-gray-500">
            Due: <span className="font-medium">{formatDueDate(task.due_date)}</span>
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
        </>
      )}
    </li>
  );
};

export default TaskItem;
