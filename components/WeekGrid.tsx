"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getTasks, createTask, updateTask, deleteTask, Task } from "../lib/tasks";

const dayHeaders = [
  { key: 'mon', day: 'ПН', offset: 0 },
  { key: 'tue', day: 'ВТ', offset: 1 },
  { key: 'wed', day: 'СР', offset: 2 },
  { key: 'thu', day: 'ЧТ', offset: 3 },
  { key: 'fri', day: 'ПТ', offset: 4 },
  { key: 'sat', day: 'СБ', offset: 5 },
  { key: 'sun', day: 'ВС', offset: 6 },
];

function getWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  
  return dayHeaders.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00');
  return { date: d.getDate().toString().padStart(2, '0'), month: d.toLocaleDateString('ru', { month: 'short' }).replace('.', '') };
}

const projectColors: Record<string, string> = {
  '#B8ADE8': 'bg-purple-card-light',
  '#D4E84D': 'bg-lime-card/40',
  '#FCB6C7': 'bg-pink-100',
  '#FDE68A': 'bg-yellow-100',
  '#93C5FD': 'bg-blue-100',
  '#FDBA74': 'bg-orange-100',
  '#5EEAD4': 'bg-teal-100',
  '#FCA5A5': 'bg-red-100',
};

export default function WeekGrid() {
  const { user, loading: authLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTexts, setNewTexts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const weekDates = getWeekDates();
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!user) return;
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getTasks(user.id, weekDates[0], weekDates[6]);
    setTasks(data);
    setLoading(false);
  };

  const handleCreate = async (date: string) => {
    const text = newTexts[date]?.trim();
    if (!text || !user) return;
    const task = await createTask(user.id, text, date);
    if (task) setTasks(prev => [...prev, task]);
    setNewTexts(prev => ({ ...prev, [date]: '' }));
  };

  const handleToggle = async (task: Task) => {
    await updateTask(task.id, { done: !task.done });
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  if (authLoading) return <div className="flex-1 flex items-center justify-center"><p className="text-text-muted">Загрузка...</p></div>;
  
  if (!user) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <i className="ph ph-sign-in text-4xl text-text-muted/20"></i>
      <p className="text-text-muted text-sm">Войди, чтобы увидеть задачи</p>
      <a href="/login" className="bg-lime-card text-text-dark font-bold text-xs px-4 py-2 rounded-lg hover:bg-lime-dark transition">Войти</a>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex h-full">
        {weekDates.map((date, i) => {
          const { date: dayNum, month } = formatDate(date);
          const isToday = date === today;
          const dayTasks = tasks.filter(t => t.date === date);

          return (
            <div key={date} className="flex-1 border-r border-grid-line flex flex-col last:border-r-0">
              <div className={`border-b border-grid-line px-3 py-3 text-center bg-surface sticky top-0 z-10 shrink-0 ${isToday ? 'border-t-2 border-t-lime-card bg-[#FEFDF5]' : ''}`}>
                <p className={`text-[10px] font-medium ${isToday ? 'text-lime-dark font-bold' : 'text-text-muted'}`}>{dayHeaders[i].day}</p>
                <p className="text-lg font-extrabold text-text-dark">{dayNum}</p>
                <p className={`text-[9px] ${isToday ? 'text-lime-dark font-bold' : 'text-text-muted'}`}>{isToday ? 'сегодня' : month}</p>
              </div>

              <div className={`p-1.5 flex flex-col gap-1.5 flex-1 ${isToday ? 'bg-[#FEFDF5]' : 'bg-white'}`}>
                {loading ? (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-sidebar/30 border-t-sidebar rounded-full animate-spin" />
                  </div>
                ) : (
                  <>
                    {dayTasks.map(task => {
                      const bgColor = task.project?.color ? (projectColors[task.project.color] || 'bg-purple-card-light') : 'bg-white border border-sidebar/30';
                      return (
                        <div key={task.id} onClick={() => handleToggle(task)}
                          className={`${bgColor} rounded-lg p-2 relative group cursor-pointer transition-all ${task.done ? 'opacity-50' : ''}`}>
                          <button onClick={(e) => { e.stopPropagation(); handleDelete(task.id); }}
                            className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/60 rounded flex items-center justify-center hover:bg-red-100 transition opacity-0 group-hover:opacity-100">
                            <i className="ph ph-x text-[8px] text-text-dark/50"></i>
                          </button>
                          <p className={`text-[11px] font-semibold text-text-dark leading-tight pr-5 ${task.done ? 'line-through' : ''}`}>{task.text}</p>
                          <p className="text-[8px] text-text-dark/50 mt-0.5">
                            {task.project?.name || 'Без проекта'}{task.time_spent ? ` · ${task.time_spent}` : ''}{task.done ? ' ✓' : ''}
                          </p>
                        </div>
                      );
                    })}

                    {!loading && dayTasks.length === 0 && isToday && (
                      <div className="flex flex-col items-center justify-center flex-1 -mt-[60px]">
                        <i className="ph ph-note-pencil text-3xl text-text-muted/15 mb-2"></i>
                        <p className="text-[11px] text-text-muted/40 font-medium text-center">Бля, пусто!</p>
                        <p className="text-[9px] text-text-muted/25 text-center mt-0.5">Впиши первую задачу</p>
                      </div>
                    )}
                  </>
                )}

                <div className="mt-auto pt-1 pb-4">
                  <input type="text" placeholder="+ задача..."
                    value={newTexts[date] || ''}
                    onChange={e => setNewTexts(prev => ({ ...prev, [date]: e.target.value }))}
                    onKeyDown={e => e.key === 'Enter' && handleCreate(date)}
                    className="w-full text-[10px] text-text-muted bg-white border-2 border-sidebar/50 rounded-lg px-2.5 py-2 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/40 transition" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
