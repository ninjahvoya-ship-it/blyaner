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
    <div className="flex-1 border-r border-[#0000000D] flex flex-col min-w-[200px]">
      {/* Шапка дня */}
      <div className="border-b border-[#0000000D] px-3 py-3 text-center bg-[#F9F9FB] sticky top-0 z-10 shrink-0">
        <p className="text-[10px] text-[#8E8A84] font-medium uppercase">{dayName}</p>
        <p className="text-lg font-extrabold text-[#222222]">{dayNumber}</p>
        <p className="text-[9px] text-[#8E8A84]">{monthName}</p>
      </div>
      
      {/* Список задач */}
      <div className="p-1.5 flex flex-col gap-1.5 flex-1 bg-white">
        <SleepWidget date={date} />
        
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
            className="w-full text-[10px] text-[#8E8A84] bg-white border-2 border-[#2A2B35]/10 rounded-lg px-2.5 py-2 outline-none focus:border-[#C2D629] focus:ring-1 focus:ring-[#C2D629]/40 placeholder:text-[#8E8A84]/40 transition"
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
