import { Task } from "../../lib/tasks";
import TaskItem from "./TaskItem";

interface Props {
  date: string;
  dayName: string;
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string, done: boolean) => void;
  onEditTask: (id: string, text: string) => void;
  onDeleteTask: (id: string) => void;
}

export default function DayColumn({ date, dayName, tasks, onAddTask, onToggleTask, onEditTask, onDeleteTask }: Props) {
  const d = new Date(date + 'T00:00:00');
  const dayNumber = d.getDate().toString().padStart(2, '0');
  const monthName = d.toLocaleDateString('ru', { month: 'short' }).replace('.', '');
  
  const focusTasks = tasks.filter(t => (t as any).is_focus);
  const regularTasks = tasks.filter(t => !(t as any).is_focus);

  return (
    <div className="flex-1 border-r border-grid-line flex flex-col min-w-[200px]">
      {/* Шапка дня */}
      <div className="border-b border-grid-line px-3 py-3 text-center bg-surface sticky top-0 z-10 shrink-0">
        <p className="text-[10px] text-text-muted font-medium uppercase">{dayName}</p>
        <p className="text-lg font-extrabold text-text-dark">{dayNumber}</p>
        <p className="text-[9px] text-text-muted">{monthName}</p>
      </div>
      
      {/* Список задач */}
      <div className="p-1.5 flex flex-col gap-1.5 flex-1 bg-white">
        
        {/* Фокус */}
        {focusTasks.length > 0 && (
          <div className="space-y-1.5 mb-1.5">
            {focusTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} isFocus />
            ))}
          </div>
        )}

        {/* Обычные задачи */}
        <div className="space-y-1.5">
          {regularTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} />
          ))}
        </div>

        {/* Инпут добавления */}
        <div className="mt-auto pt-1 pb-4">
          <input 
            type="text" 
            placeholder="+ задача..." 
            className="w-full text-[10px] text-text-muted bg-white border-2 border-sidebar/50 rounded-lg px-2.5 py-2 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/40 transition"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
                onAddTask(e.currentTarget.value.trim());
                e.currentTarget.value = '';
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
