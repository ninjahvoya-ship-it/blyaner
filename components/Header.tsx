"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Props {
  title?: string;
}

export default function Header({ title }: Props) {
  const pathname = usePathname() || '';

  return (
    <div className="h-20 bg-white border-b border-[#0000000D] flex items-center justify-between px-8 shrink-0">
      <h1 className="text-lg font-extrabold text-[#222222]">
        {title || 'Твой день'}
      </h1>

      <div className="flex items-center gap-5">
        {/* Switcher */}
        <div className="flex gap-0.5 bg-[#FBFAF5] rounded-full p-0.5 border border-[#0000000D]">
          <Link href="/day" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('day') ? 'bg-[#2A2B35] text-white' : 'text-[#8E8A84] hover:text-[#222222]'}`}>
            День
          </Link>
          <Link href="/week" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('week') ? 'bg-[#2A2B35] text-white' : 'text-[#8E8A84] hover:text-[#222222]'}`}>
            Неделя
          </Link>
          <Link href="/month" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('month') ? 'bg-[#2A2B35] text-white' : 'text-[#8E8A84] hover:text-[#222222]'}`}>
            Месяц
          </Link>
        </div>

        {/* Mini Stopwatch Widget */}
        <div className="bg-[#FBFAF5] border border-[#0000000D] rounded-full px-4 py-2 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C2D629] rounded-full flex items-center justify-center cursor-pointer shadow-sm shadow-[#C2D629]/40 hover:scale-105 transition">
            <i className="ph-fill ph-play text-[#2A2B35] text-[10px]"></i>
          </div>
          <div>
            <span className="text-sm font-bold text-[#222222] font-mono tracking-widest leading-none">00:00</span>
          </div>
        </div>

        {/* Progress Circle */}
        <div className="bg-[#F9F9FB] border border-[#0000000D] rounded-2xl px-4 py-2 flex items-center gap-3">
          <div className="relative w-9 h-9">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#ECEAF4" strokeWidth="3"/>
              <circle cx="18" cy="18" r="15" fill="none" stroke="#C2D629" strokeWidth="3" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="54"/>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-[#222222]">3/7</span>
          </div>
          <div>
            <p className="text-[10px] text-[#8E8A84] leading-tight">Задач</p>
            <p className="text-xs font-bold text-[#222222] leading-tight">Сегодня</p>
          </div>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 bg-[#C2D629] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#B8CC35] transition shadow-sm">
          <span className="text-[#2A2B35] text-sm font-bold">А</span>
        </div>
      </div>
    </div>
  );
}
