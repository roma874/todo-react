import { TaskItem } from './TaskItem';

export function TaskList({ tasks, onToggle, onRemove, onEdit }) {
  if (tasks.length === 0) {
    return <li className="empty">Здесь пусто</li>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}