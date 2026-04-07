"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getProjects, createProject, deleteProject, getGoals, createGoal, updateGoal, Project, Goal } from "../lib/tasks";

const PROJECT_COLORS = ['#B8ADE8', '#D4E84D', '#FCB6C7', '#FDE68A', '#93C5FD', '#FDBA74', '#5EEAD4', '#FCA5A5'];

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

function getWeekStart() {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
  return monday.toISOString().split('T')[0];
}

function getCalendarDays() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const firstDay = new Date(year, month, 1);
  let startDow = firstDay.getDay();
  if (startDow === 0) startDow = 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const cells: { day: number; current: boolean; today: boolean }[] = [];
  // Previous month
  for (let i = startDow - 2; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, current: false, today: false });
  }
  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, current: true, today: d === today });
  }
  // Fill remaining
  const remaining = 7 - (cells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({ day: d, current: false, today: false });
    }
  }

  const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  return { cells, title: `${months[month]} ${year}` };
}

export default function Sidebar() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState(PROJECT_COLORS[0]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newGoal, setNewGoal] = useState('');
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    const [p, g] = await Promise.all([
      getProjects(user.id),
      getGoals(user.id, 'week', getWeekStart()),
    ]);
    setProjects(p);
    setGoals(g);
    setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || '');
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim() || !user) return;
    const p = await createProject(user.id, newProjectName.trim(), newProjectColor);
    if (p) setProjects(prev => [...prev, p]);
    setNewProjectName('');
    setShowNewProject(false);
  };

  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleCreateGoal = async () => {
    if (!newGoal.trim() || !user) return;
    const g = await createGoal(user.id, newGoal.trim(), 'week', getWeekStart());
    if (g) setGoals(prev => [...prev, g]);
    setNewGoal('');
    setShowGoalInput(false);
  };

  const handleToggleGoal = async (goal: Goal) => {
    await updateGoal(goal.id, { done: !goal.done });
    setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, done: !g.done } : g));
  };

  const { cells, title: calTitle } = getCalendarDays();

  return (
    <aside className="w-[260px] bg-sidebar text-white p-5 flex flex-col shrink-0">
      {/* Logo + Name */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
          <i className="ph-bold ph-calendar-check text-sm"></i>
        </div>
        <span className="font-bold">{userName ? `Бля, ${userName}` : 'Блянер'}</span>
      </div>

      {/* Mini Calendar */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold">{calTitle}</span>
          <div className="flex gap-1">
            <button className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
              <i className="ph ph-caret-left text-[8px]"></i>
            </button>
            <button className="w-5 h-5 rounded bg-white/10 flex items-center justify-center">
              <i className="ph ph-caret-right text-[8px]"></i>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center text-[9px]">
          {WEEKDAYS.map(d => <span key={d} className="text-white/40 py-0.5">{d}</span>)}
          {cells.map((c, i) => (
            <span key={i} className={`py-0.5 ${
              c.today ? 'bg-lime-card text-text-dark rounded font-bold' :
              c.current ? 'text-white' : 'text-white/30'
            }`}>{c.day}</span>
          ))}
        </div>
      </div>

      {/* Sleep */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Сон</h3>
          <div className="relative group">
            <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
              <i className="ph ph-question text-[9px] text-white/40"></i>
            </div>
            <div className="hidden group-hover:block absolute right-0 top-6 w-48 bg-white rounded-xl p-3 shadow-xl z-50">
              <p className="text-[10px] text-text-dark leading-relaxed">Нажми <b>Сплю</b> перед сном и <b>Встала</b> утром. Блянер посчитает сколько ты спала и покажет статистику по дням.</p>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-1 h-[36px] mb-2">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex-1 bg-white/5 rounded-t h-full"></div>
          ))}
        </div>
        <p className="text-[9px] text-white/30 mb-2">Нет данных</p>
        <div className="flex gap-1.5">
          <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1">
            <i className="ph ph-moon text-[11px]"></i> Сплю
          </button>
          <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1">
            <i className="ph ph-sun text-[11px]"></i> Встала
          </button>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold">На неделю</h3>
          <button onClick={() => setShowGoalInput(!showGoalInput)}
            className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition">
            <i className="ph-bold ph-plus text-[8px]"></i>
          </button>
        </div>
        {goals.length === 0 && !showGoalInput && (
          <p className="text-[10px] text-white/25 italic">Пока пусто. Нажми + чтобы добавить цель</p>
        )}
        <div className="space-y-1.5">
          {goals.map(g => (
            <div key={g.id} className="flex items-center gap-2 group">
              <button onClick={() => handleToggleGoal(g)}
                className={`w-3.5 h-3.5 rounded-sm border shrink-0 transition ${g.done ? 'bg-lime-card border-lime-card' : 'border-white/25 hover:border-white/50'}`}>
                {g.done && <i className="ph-bold ph-check text-[7px] text-text-dark flex items-center justify-center"></i>}
              </button>
              <span className={`text-[11px] ${g.done ? 'line-through text-white/30' : 'text-white/70'}`}>{g.text}</span>
            </div>
          ))}
        </div>
        {showGoalInput && (
          <input type="text" placeholder="Цель на неделю..." value={newGoal} autoFocus
            onChange={e => setNewGoal(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') handleCreateGoal(); if (e.key === 'Escape') setShowGoalInput(false); }}
            className="w-full text-[10px] text-white bg-white/5 rounded-lg px-2 py-1.5 outline-none border border-white/10 mt-2 placeholder:text-white/20" />
        )}
      </div>

      {/* Projects */}
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-bold">Проекты</h3>
          <button onClick={() => setShowNewProject(!showNewProject)}
            className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition">
            <i className="ph-bold ph-plus text-[8px]"></i>
          </button>
        </div>

        {projects.length === 0 && !showNewProject && (
          <p className="text-[10px] text-white/25 italic">Создай первый проект</p>
        )}

        <div className="space-y-1">
          {projects.map(p => (
            <div key={p.id} className="flex items-center gap-2 group px-1 py-1 rounded hover:bg-white/5">
              <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: p.color }} />
              <span className="text-[11px] text-white/70 flex-1">{p.name}</span>
              <button onClick={() => handleDeleteProject(p.id)}
                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-300 transition">
                <i className="ph ph-x text-[9px]"></i>
              </button>
            </div>
          ))}
        </div>

        {showNewProject && (
          <div className="mt-2 bg-white/5 rounded-lg p-3">
            <input type="text" placeholder="Название проекта" value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateProject()}
              autoFocus
              className="w-full text-[11px] text-white bg-transparent border-b border-white/10 outline-none pb-1.5 mb-2 placeholder:text-white/20" />
            <div className="flex gap-1.5 mb-2">
              {PROJECT_COLORS.map(c => (
                <button key={c} onClick={() => setNewProjectColor(c)}
                  className={`w-5 h-5 rounded-full transition ${newProjectColor === c ? 'ring-2 ring-white ring-offset-1 ring-offset-sidebar' : ''}`}
                  style={{ backgroundColor: c }} />
              ))}
            </div>
            <button onClick={handleCreateProject}
              className="w-full bg-lime-card text-text-dark text-[10px] font-bold py-1.5 rounded-md hover:bg-lime-dark transition">
              Создать
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
