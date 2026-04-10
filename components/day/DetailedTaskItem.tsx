import { useState } from 'react';
import { Task } from "../../lib/tasks";

interface Props {
  task: Task;
  onToggle: (id: string, done: boolean) => void;
  onEdit: (id: string, text: string) => void;
  onDelete: (id: string) => void;
  onPlay: (id: string) => void;
}

export default function DetailedTaskItem({ task, onToggle, onEdit, onDelete, onPlay }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const projectColor = task.project?.color || '#E8E6F0'; // fallback
  const isDone = task.done;

  if (isDone) {
    return (
      <div className="rounded-2xl p-4 border-l-[4px] border-[#0000000D] flex items-center gap-4 opacity-40 bg-[#FBFAF5]/30 group transition">
        <div className="w-8 h-8 bg-[#C2D629]/30 rounded-full flex items-center justify-center shrink-0 cursor-pointer" onClick={() => onToggle(task.id, isDone)}>
          <i className="ph-bold ph-check text-[#B8CC35] text-xs"></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#222222] line-through">{task.text}</p>
          <span className="text-[10px] text-[#8E8A84]">{task.project?.name || 'Без проекта'}</span>
        </div>
        <span className="text-[11px] text-[#8E8A84] font-medium">{task.time_spent || '—'}</span>
        
        <button onClick={() => onDelete(task.id)} className="opacity-0 group-hover:opacity-100 p-1 text-red-500 hover:bg-red-50 rounded">
          <i className="ph-bold ph-trash text-sm" />
        </button>
      </div>
    );
  }

  return (
    <div 
      className="task-row rounded-2xl p-4 border-l-[4px] flex items-center gap-4 cursor-pointer relative group" 
      style={{ 
        borderLeftColor: projectColor,
        background: `color-mix(in srgb, ${projectColor} 15%, transparent)`
      }}
    >
      <button 
        onClick={() => onPlay(task.id)}
        className="w-8 h-8 bg-white/60 rounded-full flex items-center justify-center shrink-0 hover:bg-white transition"
      >
        <i className="ph ph-play text-[#2A2B35] text-xs"></i>
      </button>
      
      <div className="flex-1 min-w-0" onClick={() => setIsMenuOpen(false)}>
        <p className="text-[13px] font-semibold text-[#222222]">{task.text}</p>
        <span className="text-[10px] text-[#8E8A84]">{task.project?.name || 'Без проекта'}</span>
      </div>
      
      <span className="text-[11px] text-[#2A2B35] font-bold bg-white/60 px-3 py-1 rounded-full">
        {task.time_spent || '—'}
      </span>
      
      <div 
        onClick={() => onToggle(task.id, isDone)}
        className="w-5 h-5 rounded-full border-2 cursor-pointer transition"
        style={{ borderColor: `color-mix(in srgb, ${projectColor} 40%, transparent)` }}
      />
      
      <div className="relative">
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-6 h-6 rounded-lg hover:bg-white/60 flex items-center justify-center transition"
        >
          <i className="ph ph-dots-three text-[#8E8A84] text-sm"></i>
        </button>
        
        {isMenuOpen && (
          <div className="absolute right-0 top-8 bg-white shadow-xl border border-[#0000000D] rounded-xl py-1 w-32 z-20">
            <button 
              onClick={() => {
                const newText = prompt("Редактировать:", task.text);
                if (newText) onEdit(task.id, newText);
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs text-[#222222] hover:bg-[#F9F9FB] transition"
            >
              Редактировать
            </button>
            <button 
              onClick={() => onDelete(task.id)}
              className="w-full text-left px-4 py-2 text-xs text-red-500 hover:bg-red-50 transition"
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
