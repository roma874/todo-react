import { TaskItem } from './TaskItem';

export function TaskList({ tasks, onToggle, onRemove, onEdit }) {
  if (tasks.length === 0) {
    return <li className="empty">Здесь пусто</li>;
  }

  return (
    <ul>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          index={index}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}