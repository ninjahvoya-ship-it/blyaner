"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Stopwatch from "./Stopwatch";

const tabs = [
  { key: "day", label: "День", href: "/day" },
  { key: "week", label: "Неделя", href: "/week" },
  { key: "month", label: "Месяц", href: "/month" },
];

export default function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const activeTab = pathname?.replace("/", "") || "week";
  const { user } = useUser();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || '';
  const initial = userName.charAt(0).toUpperCase();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="bg-surface border-b border-grid-line px-6 py-3 flex items-center justify-between shrink-0">
      <h2 className="text-lg font-extrabold text-text-dark">{title}</h2>

      <div className="flex items-center gap-4">
        {/* Tabs */}
        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <a key={tab.key} href={tab.href}
              className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${activeTab === tab.key ? "bg-sidebar text-white" : "text-text-muted hover:text-text-dark hover:ring-1 hover:ring-sidebar/40"}`}>
              {tab.label}
            </a>
          ))}
        </div>

        {/* Free stopwatch */}
        <div className="hidden md:flex items-center gap-2 bg-main-bg rounded-lg px-3 py-1.5">
          <i className="ph ph-timer text-text-muted text-xs"></i>
          <Stopwatch compact={false} />
        </div>

        {/* Progress ring */}
        <div className="hidden md:flex items-center gap-2">
          <div className="relative w-9 h-9">
            <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#ECEAF4" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="#D4E84D" strokeWidth="3" strokeDasharray="94.2" strokeDashoffset="70" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-text-dark">3/12</span>
          </div>
        </div>

        {/* Avatar + Dropdown */}
        {user && (
          <div className="relative" ref={menuRef}>
            <button onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 bg-lime-card rounded-full flex items-center justify-center text-text-dark text-sm font-extrabold hover:bg-lime-dark transition ring-2 ring-transparent hover:ring-sidebar/30">
              {initial}
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-12 bg-white rounded-xl shadow-2xl border border-grid-line py-2 z-50 w-52">
                {/* User info */}
                <div className="px-4 py-2 border-b border-grid-line mb-1">
                  <p className="text-[12px] font-semibold text-text-dark">{userName}</p>
                  <p className="text-[10px] text-text-muted truncate">{user.email}</p>
                </div>

                <a href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-[12px] text-text-dark hover:bg-main-bg transition">
                  <i className="ph ph-user text-sm text-text-muted"></i>
                  Профиль
                </a>
                <a href="/settings" className="flex items-center gap-3 px-4 py-2.5 text-[12px] text-text-dark hover:bg-main-bg transition">
                  <i className="ph ph-gear text-sm text-text-muted"></i>
                  Настройки
                </a>

                <hr className="border-grid-line my-1" />

                <button onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-red-400 hover:bg-red-50 transition">
                  <i className="ph ph-sign-out text-sm"></i>
                  Выйти
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
