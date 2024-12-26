import React, { useState } from 'react';
import { CheckSquare } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import type { Task } from './types/task';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (newTask: Omit<Task, 'id' | 'createdAt'>) => {
    setTasks([
      ...tasks,
      {
        ...newTask,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <CheckSquare className="text-blue-500 mr-2" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Task Master</h1>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <TaskForm onAddTask={addTask} />
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Tasks</h2>
            <TaskList
              tasks={tasks}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
            {tasks.length === 0 && (
              <p className="text-center text-gray-500 mt-8">
                No tasks yet. Add your first task above!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;