import { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';

export function AddForm({ onAdd }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd({ text: text.trim(), priority, deadline: deadline || null });
    setText('');
    setPriority('medium');
    setDeadline('');
  };

  return (
    <form className="input-row" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Что нужно сделать?"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      
      <select 
        value={priority} 
        onChange={(e) => setPriority(e.target.value)}
        className={`priority-select ${priority}`}
      >
        <option value="low">🟢 Низкий</option>
        <option value="medium">🟡 Средний</option>
        <option value="high">🔴 Высокий</option>
      </select>

      <div className="date-wrapper">
        <Calendar size={16} className="date-icon" />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          title="Дедлайн (необязательно)"
        />
      </div>

      <button type="submit" className="add">
        <Plus size={18} />
        <span>Добавить</span>
      </button>
    </form>
  );
}