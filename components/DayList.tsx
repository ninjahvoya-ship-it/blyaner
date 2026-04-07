"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getTasks, createTask, updateTask, deleteTask, Task } from "../lib/tasks";

const projectColors: Record<string, string> = {
  '#B8ADE8': 'border-purple-card',
  '#D4E84D': 'border-lime-dark',
  '#FCB6C7': 'border-pink-400',
  '#FDE68A': 'border-yellow-400',
  '#93C5FD': 'border-blue-400',
  '#FDBA74': 'border-orange-400',
  '#5EEAD4': 'border-teal-400',
  '#FCA5A5': 'border-red-400',
};

const dotColors: Record<string, string> = {
  '#B8ADE8': 'bg-purple-card',
  '#D4E84D': 'bg-lime-card',
  '#FCB6C7': 'bg-pink-300',
  '#FDE68A': 'bg-yellow-300',
  '#93C5FD': 'bg-blue-300',
  '#FDBA74': 'bg-orange-300',
  '#5EEAD4': 'bg-teal-300',
  '#FCA5A5': 'bg-red-300',
};

export default function DayList() {
  const { user, loading: authLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showDone, setShowDone] = useState(true);
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!user) return;
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getTasks(user.id, today, today);
    setTasks(data);
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!newTask.trim() || !user) return;
    const task = await createTask(user.id, newTask.trim(), today);
    if (task) setTasks(prev => [...prev, task]);
    setNewTask('');
  };

  const handleComplete = async (task: Task) => {
    await updateTask(task.id, { done: !task.done });
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, done: !t.done } : t));
  };

  const handleDelete = async (taskId: string) => {
    await deleteTask(taskId);
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const activeTasks = tasks.filter(t => !t.done);
  const doneTasks = tasks.filter(t => t.done);

  if (authLoading) return <div className="flex-1 flex items-center justify-center"><p className="text-text-muted">Загрузка...</p></div>;
  
  if (!user) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <i className="ph ph-sign-in text-4xl text-text-muted/20"></i>
      <p className="text-text-muted text-sm">Войди, чтобы увидеть задачи</p>
      <a href="/login" className="bg-lime-card text-text-dark font-bold text-xs px-4 py-2 rounded-lg hover:bg-lime-dark transition">Войти</a>
    </div>
  );

  if (!loading && tasks.length === 0) return (
    <div className="flex-1 flex flex-col items-center justify-center px-6">
      <i className="ph ph-coffee text-5xl text-text-muted/15 mb-4"></i>
      <h2 className="text-lg font-extrabold text-text-dark mb-1">Бля, свободный день!</h2>
      <p className="text-sm text-text-muted/50 mb-6">Или ты забыла добавить задачи?</p>
      <div className="w-full max-w-md">
        <input type="text" placeholder="+ Впиши первую задачу и нажми Enter..."
          value={newTask} onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreate()}
          className="w-full text-sm text-text-muted bg-white border-2 border-sidebar/30 rounded-xl px-4 py-3.5 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/30 transition shadow-sm" />
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xs font-bold text-text-dark uppercase tracking-wider">Задачи</h2>
          <span className="text-[10px] text-text-muted bg-main-bg rounded-full px-2 py-0.5 font-medium">{activeTasks.length} активных</span>
        </div>

        <div className="flex flex-col gap-2">
          {activeTasks.map(task => {
            const border = task.project?.color ? (projectColors[task.project.color] || 'border-sidebar/30') : 'border-sidebar/30';
            const dot = task.project?.color ? (dotColors[task.project.color] || 'bg-text-muted/30') : 'bg-text-muted/30';
            return (
              <div key={task.id} className={`bg-white rounded-xl p-4 border-l-[4px] ${border} flex items-center gap-4 transition hover:translate-y-[-1px] hover:shadow-md`}>
                <button className="w-8 h-8 bg-main-bg rounded-full flex items-center justify-center shrink-0 hover:bg-grid-line transition">
                  <i className="ph ph-play text-sidebar text-xs"></i>
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-text-dark">{task.text}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`w-2 h-2 rounded ${dot}`} />
                    <span className="text-[10px] text-text-muted">{task.project?.name || 'Без проекта'}</span>
                    {task.deadline && <span className="text-[8px] text-red-400 font-bold bg-red-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><i className="ph-fill ph-flag-pennant text-[8px]"></i> {task.deadline}</span>}
                  </div>
                </div>
                <span className="text-[11px] text-text-muted font-medium">{task.time_spent || '—'}</span>
                <button onClick={() => handleComplete(task)}
                  className="w-5 h-5 rounded-full border-2 border-text-muted/25 cursor-pointer hover:border-sidebar hover:bg-sidebar/5 transition shrink-0" />
                <button onClick={() => handleDelete(task.id)}
                  className="w-6 h-6 rounded-lg hover:bg-main-bg flex items-center justify-center transition">
                  <i className="ph ph-dots-three text-text-muted text-sm"></i>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <input type="text" placeholder="+ Добавить задачу..." value={newTask}
          onChange={e => setNewTask(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleCreate()}
          className="w-full text-sm text-text-muted bg-white border-2 border-sidebar/30 rounded-xl px-4 py-3 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/40 transition" />
      </div>

      {doneTasks.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => setShowDone(!showDone)}>
            <i className={`ph ph-caret-down text-[10px] text-text-muted transition ${showDone ? '' : '-rotate-90'}`}></i>
            <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">Выполнено</h2>
            <span className="text-[10px] text-text-muted bg-main-bg rounded-full px-2 py-0.5 font-medium">{doneTasks.length}</span>
          </div>

          {showDone && (
            <div className="flex flex-col gap-2">
              {doneTasks.map(task => (
                <div key={task.id} className="bg-white/60 rounded-xl p-4 border-l-[4px] border-grid-line flex items-center gap-4 opacity-50">
                  <div className="w-8 h-8 bg-lime-card/30 rounded-full flex items-center justify-center shrink-0">
                    <i className="ph-bold ph-check text-lime-dark text-xs"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-dark line-through">{task.text}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-text-muted">{task.project?.name || 'Без проекта'}</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-text-muted font-medium">{task.time_spent || ''}</span>
                  <button onClick={() => handleComplete(task)}
                    className="text-[10px] text-text-muted hover:text-sidebar transition">↩</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
