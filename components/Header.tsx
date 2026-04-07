"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

const tabs = [
  { key: "day", label: "День", href: "/day" },
  { key: "week", label: "Неделя", href: "/week" },
  { key: "month", label: "Месяц", href: "/month" },
];

const viewTitles: Record<string, string> = {
  week: "Твоя неделя",
  day: "Твой день",
  month: "Твой месяц",
};

export default function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const activeTab = pathname?.replace("/", "") || "week";
  const { user } = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const initial = userName.charAt(0).toUpperCase();
  const displayTitle = viewTitles[activeTab] || title;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Timer
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => setTimerSeconds(s => s + 1), 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [timerRunning]);

  const formatTimer = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="bg-surface border-b border-grid-line shrink-0">
      {/* Row 1: Main controls */}
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Left: Title */}
        <h2 className="text-lg font-extrabold text-text-dark">{displayTitle}</h2>

        {/* Right: controls */}
        <div className="flex items-center gap-3">
          {/* Tabs pill */}
          <div className="flex bg-main-bg rounded-full p-0.5 gap-0.5">
            {tabs.map((tab) => (
              <a key={tab.key} href={tab.href}
                className={`text-[11px] font-bold px-4 py-1.5 rounded-full transition ${
                  activeTab === tab.key
                    ? "bg-lime-card text-text-dark"
                    : "text-text-muted hover:text-text-dark"
                }`}>
                {tab.label}
              </a>
            ))}
          </div>

          {/* Stopwatch: play button + time */}
          <div className="hidden md:flex items-center gap-1.5">
            <button onClick={() => setTimerRunning(!timerRunning)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition ${
                timerRunning ? 'bg-red-100 hover:bg-red-200' : 'bg-lime-card hover:bg-lime-dark'
              }`}>
              <i className={`ph-bold ${timerRunning ? 'ph-pause' : 'ph-play'} text-xs ${timerRunning ? 'text-red-500' : 'text-text-dark'}`}></i>
            </button>
            <span className={`font-mono text-sm font-bold tabular-nums ${timerRunning ? 'text-red-500' : 'text-text-dark'}`}>
              {formatTimer(timerSeconds)}
            </span>
          </div>

          {/* Progress ring */}
          <div className="hidden md:flex items-center gap-1.5">
            <div className="relative w-9 h-9">
              <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#ECEAF4" strokeWidth="2.5" />
                <circle cx="18" cy="18" r="15" fill="none" stroke="#8B7EC8" strokeWidth="2.5" strokeDasharray="94.2" strokeDashoffset="54" strokeLinecap="round" />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-text-dark">3/7</span>
            </div>
            <div className="leading-tight">
              <p className="text-[9px] text-text-muted">Задач</p>
              <p className="text-[10px] font-semibold text-text-dark">Сегодня</p>
            </div>
          </div>

          {/* Avatar + Dropdown */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}
                className="w-9 h-9 bg-lime-card rounded-full flex items-center justify-center text-text-dark text-sm font-extrabold hover:bg-lime-dark transition">
                {initial}
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-grid-line py-2 z-50 w-52">
                  <div className="px-4 py-2 border-b border-grid-line mb-1">
                    <p className="text-[12px] font-semibold text-text-dark">{userName}</p>
                    <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                  </div>
                  <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[12px] text-text-dark hover:bg-main-bg transition">
                    <i className="ph ph-user text-sm text-text-muted"></i> Профиль
                  </a>
                  <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-[12px] text-text-dark hover:bg-main-bg transition">
                    <i className="ph ph-gear text-sm text-text-muted"></i> Настройки
                  </a>
                  <hr className="border-grid-line my-1" />
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-red-400 hover:bg-red-50 transition">
                    <i className="ph ph-sign-out text-sm"></i> Выйти
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
