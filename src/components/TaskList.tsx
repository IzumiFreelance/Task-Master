import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import type { Task } from '../types/task';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

export function TaskList({ tasks, onToggleTask, onDeleteTask }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-500';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white p-4 rounded-lg shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow"
        >
          <button
            onClick={() => onToggleTask(task.id)}
            className="mt-1 focus:outline-none"
          >
            {task.completed ? (
              <CheckCircle2 className="text-green-500" size={24} />
            ) : (
              <Circle className="text-gray-400" size={24} />
            )}
          </button>
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <p className="text-gray-600 mt-1">{task.description}</p>
            <div className="flex gap-4 mt-2 text-sm">
              <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
              </span>
              <span className="text-gray-500">{task.category}</span>
              <span className="text-gray-500">
                Due: {new Date(task.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500 hover:text-red-600 focus:outline-none"
          >
            <Trash2 size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}