"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useUser } from "../../lib/auth";
import { getTasks, getProjects, Task, Project } from "../../lib/tasks";

function getStreak(tasks: Task[]): number {
  const today = new Date();
  let streak = 0;
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const hasDone = tasks.some(t => t.date === dateStr && t.done);
    if (hasDone) streak++;
    else if (i > 0) break;
  }
  return streak;
}

function getWeekStats(tasks: Task[]) {
  const now = new Date();
  const dow = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dow === 0 ? 6 : dow - 1));
  const mondayStr = monday.toISOString().split('T')[0];
  const sundayDate = new Date(monday);
  sundayDate.setDate(monday.getDate() + 6);
  const sundayStr = sundayDate.toISOString().split('T')[0];

  const weekTasks = tasks.filter(t => t.date >= mondayStr && t.date <= sundayStr);
  const done = weekTasks.filter(t => t.done).length;
  const total = weekTasks.length;
  return { done, total };
}

function getProjectTime(tasks: Task[], projects: Project[]) {
  const map: Record<string, { name: string; color: string; seconds: number }> = {};
  for (const t of tasks) {
    if (!t.time_spent || !t.project_id) continue;
    const hMatch = t.time_spent.match(/(\d+)\s*ч/);
    const mMatch = t.time_spent.match(/(\d+)\s*м/);
    const sec = (hMatch ? parseInt(hMatch[1]) * 3600 : 0) + (mMatch ? parseInt(mMatch[1]) * 60 : 0);
    if (!sec) continue;
    const proj = projects.find(p => p.id === t.project_id);
    if (!proj) continue;
    if (!map[proj.id]) map[proj.id] = { name: proj.name, color: proj.color, seconds: 0 };
    map[proj.id].seconds += sec;
  }
  return Object.values(map).sort((a, b) => b.seconds - a.seconds);
}

export default function ProfilePage() {
  const { user, loading: authLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const start = new Date(); start.setDate(start.getDate() - 90);
    const [t, p] = await Promise.all([
      getTasks(user.id, start.toISOString().split('T')[0], new Date().toISOString().split('T')[0]),
      getProjects(user.id)
    ]);
    setTasks(t);
    setProjects(p);
    setLoading(false);
  };

  const streak = getStreak(tasks);
  const weekStats = getWeekStats(tasks);
  const allDone = tasks.filter(t => t.done).length;
  const allTotal = tasks.length;
  const projectTime = getProjectTime(tasks, projects);
  const totalProjectSeconds = projectTime.reduce((acc, p) => acc + p.seconds, 0);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';

  return (
    <div className="flex h-screen bg-main-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Профиль" />
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {authLoading || loading ? (
            <div className="flex-1 flex items-center justify-center"><div className="w-6 h-6 border-2 border-sidebar/30 border-t-sidebar rounded-full animate-spin" /></div>
          ) : !user ? (
            <div className="text-center py-20">
              <p className="text-text-muted">Войди, чтобы увидеть профиль</p>
              <a href="/login" className="bg-lime-card text-text-dark font-bold text-xs px-4 py-2 rounded-lg mt-3 inline-block">Войти</a>
            </div>
          ) : (
            <div className="max-w-3xl">
              {/* Avatar + Name */}
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-sidebar rounded-2xl flex items-center justify-center text-white text-2xl font-extrabold">
                  {userName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="text-xl font-extrabold text-text-dark">{userName}</h1>
                  <p className="text-sm text-text-muted">{user.email}</p>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                <div className="bg-white rounded-xl p-4 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <i className="ph-fill ph-flame text-orange-400 text-lg"></i>
                  </div>
                  <p className="text-2xl font-extrabold text-text-dark">{streak}</p>
                  <p className="text-[10px] text-text-muted font-medium">стрик дней</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-text-dark">{weekStats.done}<span className="text-text-muted text-sm font-medium">/{weekStats.total}</span></p>
                  <p className="text-[10px] text-text-muted font-medium">за неделю</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-text-dark">{allDone}</p>
                  <p className="text-[10px] text-text-muted font-medium">всего выполнено</p>
                </div>
                <div className="bg-white rounded-xl p-4 text-center">
                  <p className="text-2xl font-extrabold text-text-dark">{allTotal > 0 ? Math.round((allDone / allTotal) * 100) : 0}%</p>
                  <p className="text-[10px] text-text-muted font-medium">completion rate</p>
                </div>
              </div>

              {/* Focus bar */}
              {projectTime.length > 0 && (
                <div className="bg-white rounded-xl p-5 mb-6">
                  <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-3">Фокус по проектам</h3>
                  <div className="flex rounded-full overflow-hidden h-4 mb-3">
                    {projectTime.map((p, i) => (
                      <div key={i} style={{ backgroundColor: p.color, width: `${(p.seconds / totalProjectSeconds) * 100}%` }}
                        className="h-full transition-all" title={`${p.name}: ${Math.round(p.seconds / 60)}м`} />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {projectTime.map((p, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                        <span className="text-[11px] text-text-dark font-medium">{p.name}</span>
                        <span className="text-[10px] text-text-muted">{Math.round(p.seconds / 60)}м</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              <div className="bg-white rounded-xl p-5">
                <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-3">Проекты</h3>
                {projects.length === 0 ? (
                  <p className="text-sm text-text-muted/40">Ещё нет проектов</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {projects.map(p => {
                      const pTasks = tasks.filter(t => t.project_id === p.id);
                      const pDone = pTasks.filter(t => t.done).length;
                      return (
                        <div key={p.id} className="flex items-center gap-3 bg-main-bg rounded-lg p-3">
                          <div className="w-4 h-4 rounded-md" style={{ backgroundColor: p.color }} />
                          <div className="flex-1">
                            <p className="text-[12px] font-semibold text-text-dark">{p.name}</p>
                            <p className="text-[10px] text-text-muted">{pDone}/{pTasks.length} задач</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
