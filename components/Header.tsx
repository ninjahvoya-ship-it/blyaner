"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const pathname = usePathname() || '';

  return (
    <div className="h-20 bg-surface border-b border-grid-line flex items-center justify-between px-8 shrink-0 relative z-20">
      <h1 className="text-lg font-extrabold text-text-dark">
        {title || 'Твой день'}
      </h1>

      <div className="flex items-center gap-5">
        {/* Switcher */}
        <div className="flex gap-0.5 bg-main-bg rounded-full p-0.5 border border-grid-line">
          <Link href="/day" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('day') ? 'bg-sidebar text-white' : 'text-text-muted hover:text-text-dark'}`}>
            День
          </Link>
          <Link href="/week" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('week') ? 'bg-sidebar text-white' : 'text-text-muted hover:text-text-dark'}`}>
            Неделя
          </Link>
          <Link href="/month" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('month') ? 'bg-sidebar text-white' : 'text-text-muted hover:text-text-dark'}`}>
            Месяц
          </Link>
        </div>

        {/* Mini Stopwatch Widget */}
        <div className="bg-main-bg border border-grid-line rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-card rounded-full flex items-center justify-center cursor-pointer shadow-sm shadow-lime-card/40 hover:scale-105 transition">
            <i className="ph-fill ph-pause text-text-dark text-[10px]"></i>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-text-dark font-mono tracking-widest leading-none">01:23:45</span>
            <span className="text-[8px] text-sidebar font-medium leading-none mt-1">Сервер OpenClaw</span>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="bg-surface border border-grid-line rounded-2xl px-4 py-2 flex items-center gap-3">
          <div className="relative w-9 h-9">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#ECEAF4" strokeWidth="3"/>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#8B7EC8" strokeWidth="3" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="54"/>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-text-dark">3/7</span>
          </div>
          <div>
            <p className="text-[10px] text-text-muted leading-tight">Задач</p>
            <p className="text-xs font-bold text-text-dark leading-tight">Сегодня</p>
          </div>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 bg-lime-card rounded-full flex items-center justify-center cursor-pointer hover:bg-lime-dark transition shadow-sm">
          <span className="text-text-dark text-sm font-bold">А</span>
        </div>
      </div>
    </div>
  );
}
