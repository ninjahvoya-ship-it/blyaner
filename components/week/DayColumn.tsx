import { Task } from "../../lib/tasks";
import TaskItem from "./TaskItem";
import SleepWidget from "./SleepWidget";

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
    <div className="flex-1 flex flex-col min-w-[200px] border-r border-black/5 last:border-0 relative">
      <div className="sticky top-0 bg-white/90 backdrop-blur z-10 p-3 border-b border-black/5">
        <div className="text-xs text-text-dark/50 font-bold uppercase mb-1">{dayName}</div>
        <div className="text-xl font-bold flex items-baseline gap-1">
          {dayNumber} <span className="text-xs font-normal text-text-dark/50">{monthName}</span>
        </div>
      </div>
      
      <div className="p-3 flex-1 flex flex-col gap-3 overflow-y-auto">
        <SleepWidget date={date} />
        
        {/* Фокус */}
        {focusTasks.length > 0 && (
          <div className="space-y-1">
            {focusTasks.map(task => (
              <TaskItem key={task.id} task={task} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} isFocus />
            ))}
          </div>
        )}

        {/* Обычные задачи */}
        <div className="space-y-1">
          {regularTasks.map(task => (
            <TaskItem key={task.id} task={task} onToggle={onToggleTask} onEdit={onEditTask} onDelete={onDeleteTask} />
          ))}
        </div>

        {/* Кнопка добавления */}
        <button 
          onClick={() => {
            const text = prompt('Новая задача:');
            if (text) onAddTask(text);
          }}
          className="mt-2 w-full py-2 rounded-lg border border-dashed border-black/10 text-xs text-text-dark/40 font-bold hover:bg-black/5 hover:border-black/20 transition flex items-center justify-center gap-1"
        >
          <i className="ph-bold ph-plus" /> Добавить
        </button>
      </div>
    </div>
  );
}
