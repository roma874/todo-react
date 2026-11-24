import { Calendar, AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

export function TaskItem({ task, onToggle, onRemove, onEdit }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const isOverdue = task.deadline && !task.done && new Date(task.deadline) < new Date().setHours(0,0,0,0);
  
  const formatDeadline = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const handleRemoveClick = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(task.id); // Передаем ID
    }, 250);
  };

  return (
    <li className={`priority-${task.priority} ${task.done ? 'done' : ''} ${isOverdue ? 'overdue' : ''} ${isRemoving ? 'removing' : ''}`}>
      <span onClick={() => onToggle(task.id)} onDoubleClick={() => onEdit(task.id, task.text)}>
        {task.text}
      </span>
      
      <span className="priority-badge">
        {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
      </span>

      {task.deadline && (
  <span className={`deadline ${isOverdue ? 'overdue-text' : ''}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
    {isOverdue ? <AlertTriangle size={14} /> : <Calendar size={14} />} 
    {formatDeadline(task.deadline)}
  </span>
)}

      <button className="del" onClick={handleRemoveClick}>✕</button>
    </li>
  );
}