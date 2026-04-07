"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getProjects, createProject, deleteProject, getGoals, createGoal, updateGoal, deleteGoal, Project, Goal } from "../lib/tasks";
import { usePathname } from "next/navigation";
import SleepWidget from "./SleepWidget";

const PROJECT_COLORS = ['#B8ADE8', '#D4E84D', '#FCB6C7', '#FDE68A', '#93C5FD', '#FDBA74', '#5EEAD4', '#FCA5A5'];

function getWeekStart() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  return monday.toISOString().split('T')[0];
}

export default function Sidebar() {
  const { user } = useUser();
  const pathname = usePathname();
  const [projects, setProjects] = useState<Project[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectColor, setNewProjectColor] = useState(PROJECT_COLORS[0]);
  const [showNewProject, setShowNewProject] = useState(false);
  const [newGoal, setNewGoal] = useState('');
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
  };

  const handleToggleGoal = async (goal: Goal) => {
    await updateGoal(goal.id, { done: !goal.done });
    setGoals(prev => prev.map(g => g.id === goal.id ? { ...g, done: !g.done } : g));
  };

  const navItems = [
    { href: '/week', label: 'Неделя', icon: 'ph-columns' },
    { href: '/day', label: 'День', icon: 'ph-list-checks' },
    { href: '/month', label: 'Месяц', icon: 'ph-calendar-dots' },
  ];

  return (
    <aside className="w-[260px] bg-sidebar text-white flex flex-col shrink-0 overflow-y-auto">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h1 className="text-lg font-extrabold">
          {userName ? `Бля, ${userName}` : 'Блянер'}
        </h1>
        <p className="text-[10px] text-white/30">Бля, работает.</p>
      </div>

      {/* Navigation */}
      <nav className="px-3 mb-4">
        {navItems.map(item => (
          <a key={item.href} href={item.href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] font-medium transition
              ${pathname === item.href ? 'bg-white/15 text-white' : 'text-white/50 hover:text-white/70 hover:bg-white/5'}`}>
            <i className={`ph ${item.icon} text-sm`}></i>
            {item.label}
          </a>
        ))}
      </nav>

      <hr className="border-white/10 mx-5" />

      {/* Sleep */}
      <SleepWidget />

      <hr className="border-white/10 mx-5" />

      {/* Goals */}
      <div className="px-5 py-3">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">На неделю</h3>
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
          <input type="text" placeholder="+ цель..." value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleCreateGoal()}
            className="w-full text-[10px] text-white/50 bg-transparent border-none outline-none placeholder:text-white/20 py-1" />
        </div>
      </div>

      <hr className="border-white/10 mx-5" />

      {/* Projects */}
      <div className="px-5 py-3 flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider">Проекты</h3>
          <button onClick={() => setShowNewProject(!showNewProject)} className="text-white/30 hover:text-white/60 transition">
            <i className="ph ph-plus text-xs"></i>
          </button>
        </div>

        {showNewProject && (
          <div className="mb-3 bg-white/5 rounded-lg p-3">
            <input type="text" placeholder="Название проекта" value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleCreateProject()}
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
      </div>

      {/* Bottom spacer */}
      <div className="pb-4 mt-auto" />
    </aside>
  );
}
