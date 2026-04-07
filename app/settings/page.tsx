"use client";

import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import { useUser } from "../../lib/auth";
import { getProfile, updateProfile } from "../../lib/tasks";
import { supabase } from "../../lib/supabase";

export default function SettingsPage() {
  const { user, loading: authLoading } = useUser();
  const [profile, setProfile] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);

  // Password change
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [pwMsg, setPwMsg] = useState('');

  // Delete modal
  const [showDelete, setShowDelete] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState('');

  // Export
  const [exporting, setExporting] = useState(false);

  useEffect(() => {
    if (!user) return;
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    setLoading(true);
    const p = await getProfile(user.id);
    setProfile(p);
    setLoading(false);
  };

  const handleWidgetToggle = async (key: string) => {
    if (!user || !profile) return;
    const newVal = !profile[key];
    await updateProfile(user.id, { [key]: newVal });
    setProfile(prev => prev ? { ...prev, [key]: newVal } : prev);
  };

  const handleChangePassword = async () => {
    setPwMsg('');
    if (newPassword.length < 6) { setPwMsg('Минимум 6 символов'); return; }
    if (newPassword !== newPassword2) { setPwMsg('Пароли не совпадают'); return; }
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) setPwMsg(error.message);
    else { setPwMsg('Пароль изменён!'); setNewPassword(''); setNewPassword2(''); }
  };

  const handleExport = async () => {
    if (!user) return;
    setExporting(true);
    const { data: tasks } = await supabase.from('tasks').select('*').eq('user_id', user.id);
    const { data: projects } = await supabase.from('projects').select('*').eq('user_id', user.id);
    const { data: goals } = await supabase.from('goals').select('*').eq('user_id', user.id);
    const blob = new Blob([JSON.stringify({ tasks, projects, goals }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `blyaner-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click(); URL.revokeObjectURL(url);
    setExporting(false);
  };

  const widgets = [
    { key: 'widget_sleep', label: 'Сон', icon: 'ph-moon', desc: 'Блок сна в сайдбаре' },
    { key: 'widget_streak', label: 'Стрик', icon: 'ph-flame', desc: 'Счётчик дней подряд' },
    { key: 'widget_stopwatch', label: 'Секундомер', icon: 'ph-timer', desc: 'Таймер в шапке' },
    { key: 'widget_deadlines', label: 'Дедлайны', icon: 'ph-flag-pennant', desc: 'Ближайшие дедлайны' },
    { key: 'widget_overdue', label: 'Просроченные', icon: 'ph-warning', desc: 'Просроченные задачи' },
  ];

  return (
    <div className="flex h-screen bg-main-bg">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Настройки" />
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {authLoading || loading ? (
            <div className="flex items-center justify-center py-20"><div className="w-6 h-6 border-2 border-sidebar/30 border-t-sidebar rounded-full animate-spin" /></div>
          ) : !user ? (
            <div className="text-center py-20">
              <a href="/login" className="bg-lime-card text-text-dark font-bold text-xs px-4 py-2 rounded-lg">Войти</a>
            </div>
          ) : (
            <div className="max-w-4xl grid grid-cols-2 gap-6">
              {/* Left: Widgets */}
              <div>
                <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-4">Виджеты</h3>
                <div className="space-y-2">
                  {widgets.map(w => (
                    <div key={w.key} className="bg-white rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <i className={`ph ${w.icon} text-sidebar text-lg`}></i>
                        <div>
                          <p className="text-[12px] font-semibold text-text-dark">{w.label}</p>
                          <p className="text-[10px] text-text-muted">{w.desc}</p>
                        </div>
                      </div>
                      <button onClick={() => handleWidgetToggle(w.key)}
                        className={`w-10 h-5 rounded-full transition relative ${profile?.[w.key] ? 'bg-lime-card' : 'bg-grid-line'}`}>
                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition ${profile?.[w.key] ? 'left-5' : 'left-0.5'}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Account + Data + Danger */}
              <div className="space-y-6">
                {/* Account */}
                <div>
                  <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-4">Аккаунт</h3>
                  <div className="bg-white rounded-xl p-5">
                    <p className="text-[11px] text-text-muted mb-1">Email</p>
                    <p className="text-[13px] font-semibold text-text-dark mb-4">{user.email}</p>

                    <p className="text-[11px] text-text-muted mb-2">Сменить пароль</p>
                    <input type="password" placeholder="Новый пароль" value={newPassword}
                      onChange={e => setNewPassword(e.target.value)} autoComplete="new-password"
                      className="w-full text-[12px] bg-main-bg rounded-lg px-3 py-2 outline-none border border-grid-line mb-2 text-text-dark placeholder:text-text-muted/30" />
                    <input type="password" placeholder="Повторите пароль" value={newPassword2}
                      onChange={e => setNewPassword2(e.target.value)} autoComplete="new-password"
                      className="w-full text-[12px] bg-main-bg rounded-lg px-3 py-2 outline-none border border-grid-line mb-2 text-text-dark placeholder:text-text-muted/30" />
                    {pwMsg && <p className={`text-[10px] mb-2 ${pwMsg.includes('изменён') ? 'text-lime-dark' : 'text-red-400'}`}>{pwMsg}</p>}
                    <button onClick={handleChangePassword}
                      className="bg-sidebar text-white text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-sidebar/80 transition">
                      Сменить
                    </button>
                  </div>
                </div>

                {/* Data */}
                <div>
                  <h3 className="text-xs font-bold text-text-dark uppercase tracking-wider mb-4">Данные</h3>
                  <div className="bg-white rounded-xl p-5">
                    <p className="text-[11px] text-text-muted mb-3">Экспортируй все задачи, проекты и цели в JSON</p>
                    <button onClick={handleExport} disabled={exporting}
                      className="bg-main-bg text-text-dark text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-grid-line transition flex items-center gap-2 disabled:opacity-50">
                      <i className="ph ph-download-simple text-sm"></i>
                      {exporting ? 'Экспорт...' : 'Скачать JSON'}
                    </button>
                  </div>
                </div>

                {/* Danger */}
                <div>
                  <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-4">Опасная зона</h3>
                  <div className="bg-white rounded-xl p-5 border border-red-100">
                    <p className="text-[11px] text-text-muted mb-3">Удаление аккаунта необратимо. Все задачи, проекты и данные будут стёрты.</p>
                    <button onClick={() => setShowDelete(true)}
                      className="bg-red-50 text-red-500 text-[11px] font-bold px-4 py-2 rounded-lg hover:bg-red-100 transition">
                      Удалить аккаунт
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowDelete(false)}>
          <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-4">
              <i className="ph-fill ph-warning text-red-500 text-2xl"></i>
            </div>
            <h3 className="text-lg font-extrabold text-text-dark text-center mb-2">Удалить аккаунт?</h3>
            <p className="text-[12px] text-text-muted text-center mb-4">Все данные будут удалены навсегда. Введите УДАЛИТЬ для подтверждения.</p>
            <input type="text" placeholder="УДАЛИТЬ" value={deleteConfirm}
              onChange={e => setDeleteConfirm(e.target.value)}
              className="w-full text-sm bg-main-bg rounded-lg px-3 py-2.5 outline-none border border-grid-line mb-4 text-center font-bold text-text-dark placeholder:text-text-muted/30" />
            <div className="flex gap-2">
              <button onClick={() => setShowDelete(false)}
                className="flex-1 bg-main-bg text-text-dark text-[12px] font-bold py-2.5 rounded-lg hover:bg-grid-line transition">Отмена</button>
              <button disabled={deleteConfirm !== 'УДАЛИТЬ'}
                className="flex-1 bg-red-500 text-white text-[12px] font-bold py-2.5 rounded-lg hover:bg-red-600 transition disabled:opacity-30 disabled:cursor-not-allowed">
                Удалить навсегда
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
