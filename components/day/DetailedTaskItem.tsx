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
  const [isExpanded, setIsExpanded] = useState(false);
  const projectColor = task.project?.color || '#8E8A84'; // fallback
  const isDone = task.done;

  if (isDone) {
    return (
      <div className="bg-white rounded-xl p-4 border-l-[4px] border-[#E8E6F0] flex items-center gap-4 opacity-40">
        <div className="w-8 h-8 bg-[#C2D629]/30 rounded-full flex items-center justify-center shrink-0 cursor-pointer" onClick={() => onToggle(task.id, isDone)}>
          <i className="ph-bold ph-check text-[#B8CC35] text-xs"></i>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold text-[#222222] line-through">{task.text}</p>
          <div className="flex items-center gap-2 mt-0.5">
             <div className="w-2 h-2 rounded bg-gray-300"></div>
             <span className="text-[10px] text-[#8E8A84]">{task.project?.name || 'Без проекта'}</span>
          </div>
        </div>
        <span className="text-[11px] text-[#8E8A84] font-medium">{task.time_spent || '—'}</span>
        
        <button onClick={() => onDelete(task.id)} className="w-6 h-6 rounded-lg hover:bg-red-50 flex items-center justify-center transition group">
          <i className="ph-bold ph-trash text-[#8E8A84] group-hover:text-red-500 text-sm" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border-l-[4px] shadow-sm flex flex-col transition-all overflow-hidden" style={{ borderLeftColor: projectColor }}>
      {/* Шапка задачи */}
      <div className="p-4 flex items-start gap-4">
        <button 
          onClick={() => onPlay(task.id)}
          className="w-8 h-8 bg-[#FBFAF5] rounded-full flex items-center justify-center shrink-0 hover:scale-105 transition mt-0.5"
          style={{ color: projectColor }}
        >
          <i className="ph-fill ph-play text-xs"></i>
        </button>
        
        <div className="flex-1 min-w-0 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
          <p className="text-[13px] font-semibold text-[#222222]">{task.text}</p>
          <div className="flex items-center gap-2 mt-0.5 hover:opacity-70 transition">
            <div className="w-2 h-2 rounded" style={{ backgroundColor: projectColor }}></div>
            <span className="text-[10px] text-[#8E8A84]">{task.project?.name || 'Без проекта'}</span>
          </div>
        </div>
        
        {task.time_spent ? (
          <span 
            className="text-[11px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition mt-0.5"
            style={{ backgroundColor: `color-mix(in srgb, ${projectColor} 15%, transparent)`, color: projectColor }}
          >
            {task.time_spent}
          </span>
        ) : (
          <span className="text-[11px] text-[#8E8A84] font-medium mt-1.5">—</span>
        )}
        
        <div 
          onClick={() => onToggle(task.id, isDone)}
          className="w-5 h-5 rounded-full border-2 border-[#8E8A84]/30 cursor-pointer hover:border-[#2A2B35] transition shrink-0 mt-1"
        />
        
        <div className="relative mt-0.5">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-7 h-7 rounded-lg hover:bg-[#FBFAF5] flex items-center justify-center transition"
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
                className="w-full text-left px-4 py-2 text-xs text-[#222222] hover:bg-[#FBFAF5] transition"
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

      {/* Expanded content (Subtasks / Notes) */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 ml-12 border-t border-[#0000000D]/50 mt-0">
          <div className="pt-3 space-y-2">
            
            {/* Пример подзадачи (готовая) */}
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full border border-[#B8CC35] bg-[#C2D629] flex items-center justify-center shrink-0">
                <i className="ph-bold ph-check text-[#2A2B35] text-[6px]"></i>
              </div>
              <span className="text-[12px] text-[#222222]/40 line-through">Выбрать палитру</span>
            </div>

            {/* Пример подзадачи (активная) */}
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 rounded-full border border-[#8E8A84]/30 cursor-pointer hover:border-[#2A2B35] transition shrink-0"></div>
              <span className="text-[12px] text-[#222222]">Нарисовать иконки</span>
            </div>

            {/* Инпут новой подзадачи */}
            <div className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 shrink-0"></div>
              <input type="text" placeholder="+ подзадача..." className="text-[11px] text-[#8E8A84] bg-transparent outline-none placeholder:text-[#8E8A84]/40 w-full" />
            </div>

            {/* Заметка */}
            <div className="mt-3 pt-3 border-t border-[#0000000D]/50 flex items-start gap-2">
              <i className="ph ph-note-pencil text-[#8E8A84]/40 text-sm mt-0.5"></i>
              <input type="text" placeholder="Заметка..." className="text-[11px] text-[#222222]/70 bg-transparent outline-none placeholder:text-[#8E8A84]/40 w-full" />
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
