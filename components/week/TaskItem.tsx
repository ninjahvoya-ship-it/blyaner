import { Task } from "../../lib/tasks";

interface Props {
  task: Task;
  isFocus?: boolean;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskItem({ task, isFocus, onToggle, onEdit, onDelete }: Props) {
  const projectColor = task.project?.color || '#000000';
  
  return (
    <div className={`group relative flex items-start gap-2 p-2 rounded-xl transition ${isFocus ? 'bg-black/5' : 'hover:bg-black/5'}`}>
      <button 
        onClick={() => onToggle(task.id, task.done)}
        className={`mt-0.5 shrink-0 w-4 h-4 rounded flex items-center justify-center border transition ${
          task.done ? 'bg-text-dark border-text-dark' : 'border-text-dark/20 hover:border-text-dark/50'
        }`}
      >
        {task.done && <i className="ph-bold ph-check text-[10px] text-white" />}
      </button>
      
      <div className="flex-1 min-w-0">
        <div className={`text-sm ${isFocus ? 'font-bold' : ''} ${task.done ? 'line-through text-text-dark/40' : 'text-text-dark'}`}>
          {task.text}
        </div>
      </div>
      
      {/* Делишка появляется по ховеру */}
      <button 
        onClick={() => onDelete(task.id)}
        className="opacity-0 group-hover:opacity-100 transition p-1 text-text-dark/30 hover:text-red-500 shrink-0"
      >
        <i className="ph-bold ph-trash text-sm" />
      </button>

      {/* Цветная метка проекта (если есть) */}
      {task.project_id && (
        <div 
          className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full" 
          style={{ backgroundColor: projectColor }}
        />
      )}
    </div>
  );
}
