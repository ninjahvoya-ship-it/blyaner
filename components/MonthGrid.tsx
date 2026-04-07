"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getTasks, Task } from "../lib/tasks";

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

const dotColors: Record<string, string> = {
  '#B8ADE8': 'bg-purple-card', '#D4E84D': 'bg-lime-card', '#FCB6C7': 'bg-pink-300',
  '#FDE68A': 'bg-yellow-300', '#93C5FD': 'bg-blue-300', '#FDBA74': 'bg-orange-300',
  '#5EEAD4': 'bg-teal-300', '#FCA5A5': 'bg-red-300',
};

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let startDow = firstDay.getDay();
  if (startDow === 0) startDow = 7;

  const cells: { day: number; date: string; prev?: boolean; next?: boolean; today?: boolean }[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Previous month
  const prevLast = new Date(year, month, 0);
  for (let i = startDow - 2; i >= 0; i--) {
    const d = prevLast.getDate() - i;
    const date = new Date(year, month - 1, d);
    cells.push({ day: d, date: date.toISOString().split('T')[0], prev: true });
  }

  // Current month
  for (let d = 1; d <= lastDay.getDate(); d++) {
    const date = new Date(year, month, d).toISOString().split('T')[0];
    cells.push({ day: d, date, today: date === today });
  }

  // Next month
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      const date = new Date(year, month + 1, d).toISOString().split('T')[0];
      cells.push({ day: d, date, next: true });
    }
  }

  return cells;
}

export default function MonthGrid() {
  const { user, loading: authLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  const now = new Date();
  const cells = getMonthData(now.getFullYear(), now.getMonth());
  const firstDate = cells[0].date;
  const lastDate = cells[cells.length - 1].date;

  useEffect(() => {
    if (!user) return;
    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getTasks(user.id, firstDate, lastDate);
    setTasks(data);
    setLoading(false);
  };

  if (authLoading) return <div className="flex-1 flex items-center justify-center"><p className="text-text-muted">Загрузка...</p></div>;
  
  if (!user) return (
    <div className="flex-1 flex flex-col items-center justify-center gap-3">
      <i className="ph ph-sign-in text-4xl text-text-muted/20"></i>
      <p className="text-text-muted text-sm">Войди, чтобы увидеть задачи</p>
      <a href="/login" className="bg-lime-card text-text-dark font-bold text-xs px-4 py-2 rounded-lg hover:bg-lime-dark transition">Войти</a>
    </div>
  );

  const weeks: typeof cells[] = [];
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7));
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="grid grid-cols-7 bg-surface border-b border-grid-line sticky top-0 z-10">
        {weekDays.map(d => (
          <div key={d} className="px-2 py-2 text-center text-[10px] font-bold text-text-muted">{d}</div>
        ))}
      </div>

      <div className="flex-1 flex flex-col">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 flex-1">
            {week.map((cell, ci) => {
              const dayTasks = tasks.filter(t => t.date === cell.date);
              const shown = dayTasks.slice(0, 3);
              const extra = dayTasks.length - 3;

              return (
                <a key={ci} href={`/day?date=${cell.date}`}
                  className={`border-r border-b border-grid-line p-2 transition hover:bg-sidebar/[0.03] last:border-r-0
                    ${cell.prev || cell.next ? 'bg-main-bg' : 'bg-white'}
                    ${cell.today ? 'bg-lime-card/10' : ''}
                  `}>
                  {cell.today ? (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-white font-bold bg-lime-dark w-5 h-5 rounded-full flex items-center justify-center">{cell.day}</span>
                      <span className="text-[8px] text-lime-dark font-bold">сегодня</span>
                    </div>
                  ) : (
                    <span className={`text-[11px] font-bold ${cell.prev || cell.next ? 'text-text-muted/40' : 'text-text-dark'}`}>{cell.day}</span>
                  )}

                  {shown.length > 0 && (
                    <div className="mt-1.5 space-y-1">
                      {shown.map((task) => (
                        <div key={task.id} className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${task.project?.color ? (dotColors[task.project.color] || 'bg-text-muted/30') : 'bg-text-muted/30'} shrink-0`} />
                          <p className={`text-[9px] text-text-dark truncate ${task.done ? 'line-through opacity-50' : ''}`}>{task.text}</p>
                          {task.deadline && <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" title="Дедлайн" />}
                        </div>
                      ))}
                      {extra > 0 && <p className="text-[8px] text-text-muted">+{extra} ещё</p>}
                    </div>
                  )}
                </a>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
