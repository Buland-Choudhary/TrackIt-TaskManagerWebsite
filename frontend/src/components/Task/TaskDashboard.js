import React, { useContext, useState } from 'react';
import { TaskContext } from '../../context/TaskContext';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskDashboard = () => {
  const { tasks, loading, error } = useContext(TaskContext);
  const [isAdding, setIsAdding] = useState(false);
  const [filter, setFilter] = useState({ status: '', priority: '', dueDate: '' });
  const [sort, setSort] = useState({ criteria: '', direction: 'asc' }); 

  // Apply filters
  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = !filter.status || task.status === filter.status;
    const matchesPriority = !filter.priority || task.priority === filter.priority;
    const matchesDueDate = !filter.dueDate || task.due_date.startsWith(filter.dueDate); 
    return matchesStatus && matchesPriority && matchesDueDate;
  });

  // Apply sorting
  const sortedTasks = filteredTasks.sort((a, b) => {
    const direction = sort.direction === 'asc' ? 1 : -1;
    if (sort.criteria === 'dueDate') {
      return direction * (new Date(a.due_date) - new Date(b.due_date));
    } else if (sort.criteria === 'priority') {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return direction * (priorityOrder[a.priority] - priorityOrder[b.priority]);
    } else if (sort.criteria === 'status') {
      return direction * a.status.localeCompare(b.status);
    }
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Dashboard</h1>

      {/* "Add Task" Button */}
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

      {/* Filter and Sort Controls */}
      <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
        {/* Filters */}
        <div className="flex gap-4">
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Status</option>
            <option value="Done">Done</option>
            <option value="Pending">Pending</option>
          </select>
          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input
            type="date"
            value={filter.dueDate}
            onChange={(e) => setFilter({ ...filter, dueDate: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Sort */}
        <div className="flex items-center gap-4">
          <select
            value={sort.criteria}
            onChange={(e) => setSort({ ...sort, criteria: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="">No Sorting</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
          <button
            onClick={() =>
              setSort({ ...sort, direction: sort.direction === 'asc' ? 'desc' : 'asc' })
            }
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            {sort.direction === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {/* Tasks List */}
      {loading && <p className="text-center text-gray-500 mt-4">Loading tasks...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
