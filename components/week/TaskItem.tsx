import { Task } from "../../lib/tasks";

interface Props {
  task: Task;
  isFocus?: boolean;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, isFocus, onToggle, onEdit, onDelete }: Props) {
  // Для MVP берем цвет проекта как фон карточки, если нет — дефолтный серый
  const bgColor = task.project?.color ? `bg-[${task.project.color}]/40` : 'bg-black/5';
  
  return (
    <div className={`task-card ${bgColor} rounded-lg p-2 relative group ${task.done ? 'opacity-50' : ''}`}>
      <button 
        onClick={() => onDelete(task.id)}
        className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/60 rounded flex items-center justify-center hover:bg-red-100 transition opacity-0 group-hover:opacity-100"
      >
        <i className="ph ph-x text-[8px] text-[#222222]/50" />
      </button>

      <div className="flex items-start gap-1.5">
        <button 
          onClick={() => onToggle(task.id, task.done)}
          className={`shrink-0 w-3.5 h-3.5 mt-0.5 rounded flex items-center justify-center border transition ${
            task.done ? 'bg-[#222222] border-[#222222]' : 'border-[#222222]/20 hover:border-[#222222]/50'
          }`}
        >
          {task.done && <i className="ph-bold ph-check text-[8px] text-white" />}
        </button>
        
        <div>
          <p className={`text-[11px] font-semibold leading-tight pr-5 ${task.done ? 'line-through text-[#222222]/60' : 'text-[#222222]'}`}>
            {task.text}
          </p>
          <p className="text-[8px] text-[#222222]/50 mt-0.5">
            {task.project?.name || 'Без проекта'} {task.time_spent ? `· ${task.time_spent}` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}
