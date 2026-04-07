"use client";

import { useState } from "react";

type Task = {
  id: string;
  text: string;
  project: string;
  borderColor: string;
  dotColor: string;
  time?: string;
  done: boolean;
  active?: boolean;
};

const initialActive: Task[] = [
  { id: '1', text: 'Сервер OpenClaw', project: 'OpenClaw', borderColor: 'border-pink-400', dotColor: 'bg-pink-300', active: true, done: false },
  { id: '2', text: 'Дизайн Book Tracker', project: 'Book Tracker', borderColor: 'border-purple-card', dotColor: 'bg-purple-card', time: '1ч 20м', done: false },
  { id: '3', text: 'INCI парсер', project: 'Beauty Tracker', borderColor: 'border-lime-dark', dotColor: 'bg-lime-card', done: false },
  { id: '4', text: 'Колловримо — глава', project: 'Личное', borderColor: 'border-yellow-400', dotColor: 'bg-yellow-300', done: false },
];

const initialDone: Task[] = [
  { id: '5', text: 'Сравнить файлы', project: 'Beauty Tracker', borderColor: '', dotColor: 'bg-lime-card', time: '30м', done: true },
  { id: '6', text: 'Экран Полки', project: 'Beauty Tracker', borderColor: '', dotColor: 'bg-lime-card', time: '1ч 20м', done: true },
  { id: '7', text: 'Кэш в браузере', project: 'Личное', borderColor: '', dotColor: 'bg-yellow-300', time: '5м', done: true },
];

export default function DayList() {
  const [activeTasks, setActiveTasks] = useState(initialActive);
  const [doneTasks, setDoneTasks] = useState(initialDone);
  const [newTask, setNewTask] = useState('');
  const [showDone, setShowDone] = useState(true);

  const completeTask = (id: string) => {
    const task = activeTasks.find(t => t.id === id);
    if (!task) return;
    setActiveTasks(prev => prev.filter(t => t.id !== id));
    setDoneTasks(prev => [{ ...task, done: true, active: false }, ...prev]);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    setActiveTasks(prev => [...prev, {
      id: Date.now().toString(),
      text: newTask.trim(),
      project: 'Без проекта',
      borderColor: 'border-sidebar/30',
      dotColor: 'bg-text-muted/30',
      done: false,
    }]);
    setNewTask('');
  };

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      {/* Active tasks */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xs font-bold text-text-dark uppercase tracking-wider">Задачи</h2>
          <span className="text-[10px] text-text-muted bg-main-bg rounded-full px-2 py-0.5 font-medium">{activeTasks.length} активных</span>
        </div>

        <div className="flex flex-col gap-2">
          {activeTasks.map(task => (
            <div key={task.id} className={`bg-white rounded-xl p-4 border-l-[4px] ${task.borderColor} flex items-center gap-4 ${task.active ? 'ring-2 ring-pink-200' : ''} transition hover:translate-y-[-1px] hover:shadow-md`}>
              <button className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition ${task.active ? 'bg-pink-100 hover:bg-pink-200' : 'bg-main-bg hover:bg-grid-line'}`}>
                <span className={`text-xs ${task.active ? 'text-pink-500' : 'text-sidebar'}`}>{task.active ? '⏸' : '▶'}</span>
              </button>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-text-dark">{task.text}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <div className={`w-2 h-2 rounded ${task.dotColor}`} />
                  <span className="text-[10px] text-text-muted">{task.project}</span>
                </div>
              </div>
              {task.active ? (
                <span className="text-xs font-bold text-pink-500 bg-pink-50 px-3 py-1.5 rounded-full animate-pulse font-mono">⏱ 01:23</span>
              ) : (
                <span className="text-[11px] text-text-muted font-medium">{task.time || '—'}</span>
              )}
              <button 
                onClick={() => completeTask(task.id)}
                className="w-5 h-5 rounded-full border-2 border-text-muted/25 cursor-pointer hover:border-sidebar hover:bg-sidebar/5 transition shrink-0"
              />
              <button className="w-6 h-6 rounded-lg hover:bg-main-bg flex items-center justify-center transition">
                <span className="text-text-muted text-sm">⋯</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add task */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="+ Добавить задачу..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="w-full text-sm text-text-muted bg-white border-2 border-sidebar/30 rounded-xl px-4 py-3 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/40 transition"
        />
      </div>

      {/* Completed */}
      <div>
        <div className="flex items-center gap-2 mb-3 cursor-pointer" onClick={() => setShowDone(!showDone)}>
          <span className={`text-[10px] text-text-muted transition ${showDone ? '' : '-rotate-90'}`}>▼</span>
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider">Выполнено</h2>
          <span className="text-[10px] text-text-muted bg-main-bg rounded-full px-2 py-0.5 font-medium">{doneTasks.length}</span>
        </div>

        {showDone && (
          <div className="flex flex-col gap-2">
            {doneTasks.map(task => (
              <div key={task.id} className="bg-white/60 rounded-xl p-4 border-l-[4px] border-grid-line flex items-center gap-4 opacity-50">
                <div className="w-8 h-8 bg-lime-card/30 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-lime-dark text-xs font-bold">✓</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-text-dark line-through">{task.text}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <div className={`w-2 h-2 rounded ${task.dotColor}`} />
                    <span className="text-[10px] text-text-muted">{task.project}</span>
                  </div>
                </div>
                <span className="text-[11px] text-text-muted font-medium">{task.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
