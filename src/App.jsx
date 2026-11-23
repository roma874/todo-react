import { useState, useEffect } from 'react';
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
    setTasks([...tasks, { ...taskData, done: false }]);
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].done = !newTasks[index].done;
    setTasks(newTasks);
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const editTask = (index, oldText) => {
    const newText = prompt('Редактировать задачу:', oldText);
    if (newText === null || !newText.trim()) return;
    const newTasks = [...tasks];
    newTasks[index].text = newText.trim();
    setTasks(newTasks);
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
      <h1>📝 Мои задачи</h1>

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
        🗑 Очистить выполненные
      </button>

      <div className="footer">
        Осталось: {left} из {tasks.length}
        {overdueCount > 0 && ` · просрочено: ${overdueCount}`}
      </div>
    </div>
  );
}

export default App;
