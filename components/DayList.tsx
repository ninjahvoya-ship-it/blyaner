"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getTasks, createTask, updateTask, deleteTask, getProjects, createSubtask, updateSubtask, deleteSubtask, Task, Project, Subtask } from "../lib/tasks";
import Stopwatch, { parseTimeSpent, formatTimeSpent } from "./Stopwatch";

const projectColors: Record<string, string> = {
  '#B8ADE8': 'border-purple-card', '#D4E84D': 'border-lime-dark', '#FCB6C7': 'border-pink-400',
  '#FDE68A': 'border-yellow-400', '#93C5FD': 'border-blue-400', '#FDBA74': 'border-orange-400',
  '#5EEAD4': 'border-teal-400', '#FCA5A5': 'border-red-400',
};
const dotColors: Record<string, string> = {
  '#B8ADE8': 'bg-purple-card', '#D4E84D': 'bg-lime-card', '#FCB6C7': 'bg-pink-300',
  '#FDE68A': 'bg-yellow-300', '#93C5FD': 'bg-blue-300', '#FDBA74': 'bg-orange-300',
  '#5EEAD4': 'bg-teal-300', '#FCA5A5': 'bg-red-300',
};

export default function DayList() {
  const { user, loading: authLoading } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newTask, setNewTask] = useState('');
  const [showDone, setShowDone] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newSubtask, setNewSubtask] = useState('');
  const [menuId, setMenuId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [loading, setLoading] = useState(true);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!user) return;
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    const [t, p] = await Promise.all([getTasks(user.id, today, today), getProjects(user.id)]);
    setTasks(t);
    setProjects(p);
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
    setMenuId(null);
  };

  const handleSaveTime = async (taskId: string, seconds: number) => {
    const timeStr = formatTimeSpent(seconds);
    await updateTask(taskId, { time_spent: timeStr });
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, time_spent: timeStr } : t));
  };

  const handleSetProject = async (taskId: string, projectId: string | null) => {
    await updateTask(taskId, { project_id: projectId } as Partial<Task>);
    const proj = projectId ? projects.find(p => p.id === projectId) : null;
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, project_id: projectId, project: proj ? { name: proj.name, color: proj.color } : null } : t));
    setMenuId(null);
  };

  const handleSetDeadline = async (taskId: string, deadline: string) => {
    await updateTask(taskId, { deadline: deadline || null });
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, deadline: deadline || null } : t));
    setMenuId(null);
  };

  const handleEditSave = async (taskId: string) => {
    if (!editText.trim()) return;
    await updateTask(taskId, { text: editText.trim() });
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, text: editText.trim() } : t));
    setEditingId(null);
  };

  const handleAddSubtask = async (taskId: string) => {
    if (!newSubtask.trim()) return;
    const sub = await createSubtask(taskId, newSubtask.trim());
    if (sub) {
      setTasks(prev => prev.map(t => t.id === taskId ? { ...t, subtasks: [...(t.subtasks || []), sub] } : t));
    }
    setNewSubtask('');
  };

  const handleToggleSubtask = async (taskId: string, sub: Subtask) => {
    await updateSubtask(sub.id, { done: !sub.done });
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, subtasks: (t.subtasks || []).map(s => s.id === sub.id ? { ...s, done: !s.done } : s) } : t));
  };

  const handleDeleteSubtask = async (taskId: string, subId: string) => {
    await deleteSubtask(subId);
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, subtasks: (t.subtasks || []).filter(s => s.id !== subId) } : t));
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
        <input type="text" placeholder="+ Впиши первую задачу и нажми Enter..." value={newTask}
          onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()}
          className="w-full text-sm text-text-muted bg-white border-2 border-sidebar/30 rounded-xl px-4 py-3.5 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/30 transition shadow-sm" />
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-xs font-bold text-text-dark uppercase tracking-wider">Задачи</h2>
          <span className="text-[10px] text-text-muted bg-main-bg rounded-full px-2 py-0.5 font-medium">{activeTasks.length}</span>
        </div>

        <div className="flex flex-col gap-2">
          {activeTasks.map(task => {
            const border = task.project?.color ? (projectColors[task.project.color] || 'border-sidebar/30') : 'border-sidebar/30';
            const dot = task.project?.color ? (dotColors[task.project.color] || 'bg-text-muted/30') : 'bg-text-muted/30';
            const isExpanded = expandedId === task.id;
            const isEditing = editingId === task.id;
            const subs = task.subtasks || [];
            const subsDone = subs.filter(s => s.done).length;

            return (
              <div key={task.id} className={`bg-white rounded-xl border-l-[4px] ${border} transition hover:shadow-md relative`}>
                <div className="flex items-center gap-3 p-4 cursor-pointer" onClick={() => setExpandedId(isExpanded ? null : task.id)}>
                  <Stopwatch taskId={task.id} initialSeconds={parseTimeSpent(task.time_spent)} onSave={handleSaveTime} compact />

                  <div className="flex-1 min-w-0">
                    {isEditing ? (
                      <input type="text" value={editText} onChange={e => setEditText(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') handleEditSave(task.id); if (e.key === 'Escape') setEditingId(null); }}
                        onBlur={() => handleEditSave(task.id)} autoFocus
                        className="text-[13px] font-semibold text-text-dark bg-transparent outline-none border-b border-sidebar/30 w-full"
                        onClick={e => e.stopPropagation()} />
                    ) : (
                      <p className="text-[13px] font-semibold text-text-dark" onDoubleClick={(e) => { e.stopPropagation(); setEditingId(task.id); setEditText(task.text); }}>{task.text}</p>
                    )}
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className={`w-2 h-2 rounded ${dot}`} />
                      <span className="text-[10px] text-text-muted">{task.project?.name || 'Без проекта'}</span>
                      {subs.length > 0 && <span className="text-[9px] text-text-muted bg-main-bg px-1.5 py-0.5 rounded">{subsDone}/{subs.length}</span>}
                      {task.deadline && <span className="text-[8px] text-red-400 font-bold bg-red-50 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><i className="ph-fill ph-flag-pennant text-[8px]"></i>{task.deadline}</span>}
                    </div>
                  </div>

                  <span className="text-[11px] text-text-muted font-medium">{task.time_spent || ''}</span>

                  <button onClick={(e) => { e.stopPropagation(); handleComplete(task); }}
                    className="w-5 h-5 rounded-full border-2 border-text-muted/25 hover:border-lime-dark hover:bg-lime-card/10 transition shrink-0" />

                  <div className="relative">
                    <button onClick={(e) => { e.stopPropagation(); setMenuId(menuId === task.id ? null : task.id); }}
                      className="w-6 h-6 rounded-lg hover:bg-main-bg flex items-center justify-center transition">
                      <i className="ph ph-dots-three text-text-muted text-sm"></i>
                    </button>

                    {menuId === task.id && (
                      <div className="absolute right-0 top-8 bg-white rounded-xl shadow-xl border border-grid-line py-2 z-50 w-48" onClick={e => e.stopPropagation()}>
                        <button onClick={() => { setEditingId(task.id); setEditText(task.text); setMenuId(null); }}
                          className="w-full text-left px-4 py-2 text-[11px] text-text-dark hover:bg-main-bg flex items-center gap-2">
                          <i className="ph ph-pencil-simple text-xs text-text-muted"></i> Редактировать
                        </button>

                        <div className="px-4 py-2">
                          <p className="text-[9px] font-bold text-text-muted uppercase mb-1.5">Проект</p>
                          <div className="flex flex-wrap gap-1">
                            <button onClick={() => handleSetProject(task.id, null)}
                              className={`text-[9px] px-2 py-1 rounded-full border transition ${!task.project_id ? 'border-sidebar bg-sidebar/10' : 'border-grid-line hover:border-sidebar/30'}`}>Без проекта</button>
                            {projects.map(p => (
                              <button key={p.id} onClick={() => handleSetProject(task.id, p.id)}
                                className={`text-[9px] px-2 py-1 rounded-full border transition flex items-center gap-1 ${task.project_id === p.id ? 'border-sidebar bg-sidebar/10' : 'border-grid-line hover:border-sidebar/30'}`}>
                                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: p.color }}></span>{p.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="px-4 py-2">
                          <p className="text-[9px] font-bold text-text-muted uppercase mb-1.5">Дедлайн</p>
                          <input type="date" value={task.deadline || ''}
                            onChange={e => handleSetDeadline(task.id, e.target.value)}
                            className="text-[10px] text-text-dark bg-main-bg rounded-lg px-2 py-1 outline-none border border-grid-line w-full" />
                        </div>

                        <hr className="border-grid-line my-1" />
                        <button onClick={() => handleDelete(task.id)}
                          className="w-full text-left px-4 py-2 text-[11px] text-red-400 hover:bg-red-50 flex items-center gap-2">
                          <i className="ph ph-trash text-xs"></i> Удалить
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-grid-line pt-3">
                    <p className="text-[9px] font-bold text-text-muted uppercase mb-2">Подзадачи</p>
                    <div className="space-y-1.5 mb-2">
                      {subs.map(sub => (
                        <div key={sub.id} className="flex items-center gap-2 group">
                          <button onClick={() => handleToggleSubtask(task.id, sub)}
                            className={`w-3.5 h-3.5 rounded-sm border shrink-0 transition ${sub.done ? 'bg-lime-card border-lime-card' : 'border-text-muted/25 hover:border-sidebar'}`}>
                            {sub.done && <i className="ph-bold ph-check text-[7px] text-text-dark flex items-center justify-center"></i>}
                          </button>
                          <span className={`text-[11px] flex-1 ${sub.done ? 'line-through text-text-muted/40' : 'text-text-dark'}`}>{sub.text}</span>
                          <button onClick={() => handleDeleteSubtask(task.id, sub.id)}
                            className="opacity-0 group-hover:opacity-100 text-text-muted/30 hover:text-red-400 transition">
                            <i className="ph ph-x text-[9px]"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <input type="text" placeholder="+ подзадача..." value={newSubtask}
                      onChange={e => setNewSubtask(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAddSubtask(task.id)}
                      className="w-full text-[10px] text-text-muted bg-main-bg rounded-lg px-3 py-2 outline-none placeholder:text-text-muted/30" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <input type="text" placeholder="+ Добавить задачу..." value={newTask}
          onChange={e => setNewTask(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleCreate()}
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
                <div key={task.id} className="bg-white/60 rounded-xl p-4 border-l-[4px] border-grid-line flex items-center gap-3 opacity-50">
                  <div className="w-8 h-8 bg-lime-card/30 rounded-full flex items-center justify-center shrink-0">
                    <i className="ph-bold ph-check text-lime-dark text-xs"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-text-dark line-through">{task.text}</p>
                    <span className="text-[10px] text-text-muted">{task.project?.name || ''}</span>
                  </div>
                  <span className="text-[11px] text-text-muted">{task.time_spent || ''}</span>
                  <button onClick={() => handleComplete(task)} className="text-[10px] text-text-muted hover:text-sidebar transition">
                    <i className="ph ph-arrow-counter-clockwise text-xs"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
