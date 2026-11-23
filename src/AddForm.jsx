import { useState } from 'react';

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
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="low">🟢 Низкий</option>
        <option value="medium">🟡 Средний</option>
        <option value="high">🔴 Высокий</option>
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        title="Дедлайн (необязательно)"
      />
      <button type="submit" className="add">Добавить</button>
    </form>
  );
}