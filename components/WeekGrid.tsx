"use client";

import { useState } from "react";

type Task = {
  id: string;
  text: string;
  project: string;
  color: string;
  time?: string;
  done: boolean;
};

const initialTasks: Record<string, Task[]> = {
  mon: [
    { id: '1', text: 'Сравнить файлы', project: 'Beauty', color: 'bg-purple-card-light', time: '30м', done: true },
    { id: '2', text: 'Экран Полки', project: 'Beauty', color: 'bg-lime-card/40', time: '1ч 20м', done: false },
    { id: '3', text: 'API Anthropic', project: 'OpenClaw', color: 'bg-pink-100', done: false },
  ],
  tue: [
    { id: '4', text: 'Календарь Beauty', project: 'Beauty Tracker', color: 'bg-lime-card/40', done: false },
    { id: '5', text: 'Сервер Hetzner', project: 'OpenClaw', color: 'bg-pink-100', done: false },
  ],
  wed: [
    { id: '6', text: 'Дизайн Book Tracker', project: 'Book Tracker', color: 'bg-purple-card-light', done: false },
    { id: '7', text: 'INCI парсер', project: 'Beauty Tracker', color: 'bg-lime-card/40', done: false },
  ],
  thu: [
    { id: '8', text: 'Пост jellyfish lab', project: 'jellyfish lab', color: 'bg-pink-100', done: false },
    { id: '9', text: 'OpenClaw setup', project: 'OpenClaw', color: 'bg-purple-card-light', done: false },
  ],
  fri: [
    { id: '10', text: 'Пост в Тредс', project: 'Личное', color: 'bg-yellow-100', done: false },
    { id: '11', text: 'Бэкап памяти', project: 'OpenClaw', color: 'bg-purple-card-light', done: false },
  ],
  sat: [
    { id: '12', text: 'Добить планер!', project: 'Planner', color: 'bg-lime-card', done: false },
    { id: '13', text: 'Колловримо — глава', project: 'Личное', color: 'bg-yellow-100', done: false },
  ],
  sun: [],
};

const dayHeaders = [
  { key: 'mon', day: 'ПН', date: '31', month: 'мар' },
  { key: 'tue', day: 'ВТ', date: '01', month: 'апр' },
  { key: 'wed', day: 'СР', date: '02', month: 'апр' },
  { key: 'thu', day: 'ЧТ', date: '03', month: 'апр' },
  { key: 'fri', day: 'ПТ', date: '04', month: 'апр' },
  { key: 'sat', day: 'СБ', date: '05', month: 'апр', today: true },
  { key: 'sun', day: 'ВС', date: '06', month: 'апр' },
];

export default function WeekGrid() {
  const [tasks, setTasks] = useState(initialTasks);
  const [newTaskTexts, setNewTaskTexts] = useState<Record<string, string>>({});

  const toggleTask = (dayKey: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].map(t => 
        t.id === taskId ? { ...t, done: !t.done } : t
      )
    }));
  };

  const addTask = (dayKey: string) => {
    const text = newTaskTexts[dayKey]?.trim();
    if (!text) return;
    setTasks(prev => ({
      ...prev,
      [dayKey]: [...prev[dayKey], {
        id: Date.now().toString(),
        text,
        project: 'Без проекта',
        color: 'bg-white border border-sidebar/30',
        done: false,
      }]
    }));
    setNewTaskTexts(prev => ({ ...prev, [dayKey]: '' }));
  };

  const deleteTask = (dayKey: string, taskId: string) => {
    setTasks(prev => ({
      ...prev,
      [dayKey]: prev[dayKey].filter(t => t.id !== taskId)
    }));
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="flex h-full">
        {dayHeaders.map(({ key, day, date, month, today }) => (
          <div key={key} className="flex-1 border-r border-grid-line flex flex-col last:border-r-0">
            {/* Header */}
            <div className={`border-b border-grid-line px-3 py-3 text-center bg-surface sticky top-0 z-10 shrink-0 ${today ? 'border-t-2 border-t-lime-card bg-[#FEFDF5]' : ''}`}>
              <p className={`text-[10px] font-medium ${today ? 'text-lime-dark font-bold' : 'text-text-muted'}`}>{day}</p>
              <p className="text-lg font-extrabold text-text-dark">{date}</p>
              <p className={`text-[9px] ${today ? 'text-lime-dark font-bold' : 'text-text-muted'}`}>{today ? 'сегодня' : month}</p>
            </div>

            {/* Tasks */}
            <div className={`p-1.5 flex flex-col gap-1.5 flex-1 ${today ? 'bg-[#FEFDF5]' : 'bg-white'}`}>
              {tasks[key]?.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(key, task.id)}
                  className={`${task.color} rounded-lg p-2 relative group cursor-pointer transition-all ${task.done ? 'opacity-50' : ''}`}
                >
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteTask(key, task.id); }}
                    className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/60 rounded flex items-center justify-center hover:bg-red-100 transition opacity-0 group-hover:opacity-100"
                  >
                    <i className="ph ph-x text-[8px] text-text-dark/50"></i>
                  </button>
                  <p className={`text-[11px] font-semibold text-text-dark leading-tight pr-5 ${task.done ? 'line-through' : ''}`}>
                    {task.text}
                  </p>
                  <p className="text-[8px] text-text-dark/50 mt-0.5">
                    {task.project}{task.time ? ` · ${task.time}` : ''}{task.done ? ' ✓' : ''}
                  </p>
                </div>
              ))}

              {/* Add task input */}
              <div className="mt-auto pt-1 pb-4">
                <input
                  type="text"
                  placeholder="+ задача..."
                  value={newTaskTexts[key] || ''}
                  onChange={(e) => setNewTaskTexts(prev => ({ ...prev, [key]: e.target.value }))}
                  onKeyDown={(e) => e.key === 'Enter' && addTask(key)}
                  className="w-full text-[10px] text-text-muted bg-white border-2 border-sidebar/50 rounded-lg px-2.5 py-2 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/40 transition"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
