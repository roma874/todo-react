
import { useState, useEffect } from 'react';
import { ListTodo, Trash2 } from 'lucide-react';
import { useLocalStorage } from './useLocalStorage';
import { AddForm } from './AddForm';
import { Filters } from './Filters';
import { TaskList } from './TaskList';
import { ThemeToggle } from './ThemeToggle';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const isOverdue = (task) => {
    if (!task.deadline || task.done) return false;
    return new Date(task.deadline) < new Date().setHours(0,0,0,0);
  };

  const addTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: crypto.randomUUID(),
      done: false
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const editTask = (id, oldText) => {
    const newText = prompt('Редактировать задачу:', oldText);
    if (newText === null || !newText.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText.trim() } : t));
  };

  const clearDone = () => {
    if (!window.confirm('Удалить все выполненные задачи?')) return;
    setTasks(tasks.filter(t => !t.done));
  };

  const filteredTasks = tasks
    .filter(t => {
      if (currentFilter === 'active' && t.done) return false;
      if (currentFilter === 'done' && !t.done) return false;
      if (searchQuery && !t.text.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      const aOver = isOverdue(a);
      const bOver = isOverdue(b);
      if (aOver !== bOver) return aOver ? -1 : 1;
      const pOrder = { high: 0, medium: 1, low: 2 };
      if (pOrder[a.priority] !== pOrder[b.priority]) return pOrder[a.priority] - pOrder[b.priority];
      if (a.deadline && b.deadline) return new Date(a.deadline) - new Date(b.deadline);
      return 0;
    });

  const left = tasks.filter(t => !t.done).length;
  const overdueCount = tasks.filter(isOverdue).length;

  useEffect(() => {
    if (overdueCount > 0) document.title = `⚠️ (${overdueCount}) Мои задачи`;
    else if (left > 0) document.title = `(${left}) Мои задачи`;
    else document.title = 'Мои задачи';
  }, [left, overdueCount]);

  return (
    <div className="app">
      <ThemeToggle />
      <h1>
        <ListTodo size={24} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> 
        Мои задачи
      </h1>

      <AddForm onAdd={addTask} />
      
      <TaskList 
        tasks={filteredTasks} 
        onToggle={toggleTask} 
        onRemove={removeTask} 
        onEdit={editTask} 
      />

      <Filters 
        currentFilter={currentFilter} 
        setFilter={setCurrentFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <button className="clear-done" onClick={clearDone} disabled={tasks.every(t => !t.done)}>
        <Trash2 size={16} style={{ verticalAlign: 'middle', marginRight: '6px' }} /> 
        Очистить выполненные
      </button>

      <div className="footer">
        Осталось: {left} из {tasks.length}
        {overdueCount > 0 && ` · просрочено: ${overdueCount}`}
      </div>
    </div>
  );
}

export default App;