"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ClientDayView() {
  const pathname = usePathname() || "";

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#E8E6F0] font-sans">
      <div className="max-w-[1440px] mx-auto bg-[#F4F3F8] rounded-[32px] shadow-xl overflow-hidden flex min-h-[93vh]">
        
        {/* ===== LEFT SIDEBAR ===== */}
        {/* Сделали сайдбар чуть уже (240px вместо 260px) и уменьшили внутренние отступы (p-4 вместо p-5), чтобы виджеты смотрелись компактнее */}
        <div className="w-[240px] bg-[#8B7EC8] text-white p-4 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
              <i className="ph-bold ph-calendar-check text-sm"></i>
            </div>
            <span className="font-bold">Бля, Ань</span>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold">Апрель 2026</span>
              <div className="flex gap-1">
                <button className="w-5 h-5 rounded bg-white/10 flex items-center justify-center"><i className="ph ph-caret-left text-[8px]"></i></button>
                <button className="w-5 h-5 rounded bg-white/10 flex items-center justify-center"><i className="ph ph-caret-right text-[8px]"></i></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-0.5 text-center text-[9px]">
              <span className="text-white/40 py-0.5">Пн</span><span className="text-white/40 py-0.5">Вт</span><span className="text-white/40 py-0.5">Ср</span><span className="text-white/40 py-0.5">Чт</span><span className="text-white/40 py-0.5">Пт</span><span className="text-white/40 py-0.5">Сб</span><span className="text-white/40 py-0.5">Вс</span>
              <span className="py-0.5 text-white/30">30</span><span className="py-0.5 text-white/30">31</span><span className="py-0.5">1</span><span className="py-0.5">2</span><span className="py-0.5">3</span><span className="py-0.5">4</span>
              <span className="py-0.5 bg-[#D4E84D] text-[#2D2B3D] rounded font-bold">5</span>
              <span className="py-0.5">6</span><span className="py-0.5">7</span><span className="py-0.5">8</span><span className="py-0.5">9</span><span className="py-0.5">10</span><span className="py-0.5">11</span><span className="py-0.5">12</span>
              <span className="py-0.5">13</span><span className="py-0.5">14</span><span className="py-0.5">15</span><span className="py-0.5">16</span><span className="py-0.5">17</span><span className="py-0.5">18</span><span className="py-0.5">19</span>
              <span className="py-0.5">20</span><span className="py-0.5">21</span><span className="py-0.5">22</span><span className="py-0.5">23</span><span className="py-0.5">24</span><span className="py-0.5">25</span><span className="py-0.5">26</span>
              <span className="py-0.5">27</span><span className="py-0.5">28</span><span className="py-0.5">29</span><span className="py-0.5">30</span>
            </div>
          </div>

          <div className="bg-white/10 rounded-xl p-2.5 mb-4">
            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">Сон</h3>
            {/* Уменьшили высоту графика с 36px до 30px */}
            <div className="flex items-end justify-between gap-1 h-[30px] mb-2">
              <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-[#D4E84D]/60 rounded-t h-[70%]"></div></div>
              <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-[#D4E84D]/60 rounded-t h-[50%]"></div></div>
              <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-[#FCA5A5]/60 rounded-t h-[25%]"></div></div>
              <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-[#D4E84D]/60 rounded-t h-[80%]"></div></div>
              <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-[#D4E84D]/60 rounded-t h-[55%]"></div></div>
              <div className="flex-1 bg-white/10 rounded-t h-full"></div>
              <div className="flex-1 bg-white/10 rounded-t h-full"></div>
            </div>
            <p className="text-[9px] text-white/40 mb-2">Среднее: <b className="text-white">5.8 ч</b></p>
            <div className="flex gap-1.5">
              <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg"><i className="ph ph-moon text-[11px]"></i> Сплю</button>
              <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg"><i className="ph ph-sun text-[11px]"></i> Встала</button>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold">На неделю</h3>
              <button className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition"><i className="ph-bold ph-plus text-[8px]"></i></button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-white/30"></div><span className="text-[11px]">Выбрать стиль Beauty</span></div>
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-[#D4E84D] bg-[#D4E84D]/30 flex items-center justify-center"><i className="ph-bold ph-check text-[#D4E84D] text-[6px]"></i></div><span className="text-[11px] text-white/40 line-through">Спек Планера</span></div>
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-white/30"></div><span className="text-[11px]">Поднять OpenClaw</span></div>
              <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-white/30"></div><span className="text-[11px]">Пост в Тредс</span></div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-bold">Проекты</h3>
              <button className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition"><i className="ph-bold ph-plus text-[8px]"></i></button>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer group transition">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#B8ADE8]"></div><span className="text-xs text-white/80 group-hover:text-white">Book Tracker</span></div>
                <i className="ph ph-dots-three text-white/0 group-hover:text-white/40"></i>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer group transition">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#D4E84D]"></div><span className="text-xs text-white/80 group-hover:text-white">Beauty Tracker</span></div>
                <i className="ph ph-dots-three text-white/0 group-hover:text-white/40"></i>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer group transition">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#FCA5A5]"></div><span className="text-xs text-white/80 group-hover:text-white">OpenClaw</span></div>
                <i className="ph ph-dots-three text-white/0 group-hover:text-white/40"></i>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded-lg hover:bg-white/5 cursor-pointer group transition">
                <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded bg-[#FDE68A]"></div><span className="text-xs text-white/80 group-hover:text-white">Личное</span></div>
                <i className="ph ph-dots-three text-white/0 group-hover:text-white/40"></i>
              </div>
            </div>
          </div>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="flex-1 flex flex-col">
          
          {/* Header */}
          <div className="bg-[#FFFFFF] border-b border-[#ECEAF4]">
            <div className="flex justify-between items-center px-5 pt-3 pb-3">
              <h1 className="text-lg font-extrabold text-[#2D2B3D]">Твой день</h1>
              <div className="flex items-center gap-5">
                <div className="flex gap-0.5 bg-[#F4F3F8] rounded-full p-0.5">
                  <Link href="/day" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('day') ? 'bg-[#8B7EC8] text-white' : 'text-[#8E8BA0] hover:text-[#2D2B3D]'}`}>День</Link>
                  <Link href="/week" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('week') ? 'bg-[#8B7EC8] text-white' : 'text-[#8E8BA0] hover:text-[#2D2B3D]'}`}>Неделя</Link>
                  <Link href="/month" className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${pathname.includes('month') ? 'bg-[#8B7EC8] text-white' : 'text-[#8E8BA0] hover:text-[#2D2B3D]'}`}>Месяц</Link>
                </div>
                
                {/* Дефолтное состояние секундомера (без запущенной задачи) */}
                <div className="bg-[#F4F3F8] rounded-full px-4 py-2 flex items-center gap-2">
                  <div className="w-8 h-8 bg-[#ECEAF4] rounded-full flex items-center justify-center hover:bg-[#D4E84D] hover:shadow-sm cursor-pointer transition group">
                    <i className="ph-fill ph-play text-[#8E8BA0] group-hover:text-[#2D2B3D] text-[10px] transition"></i>
                  </div>
                  <span className="text-sm font-bold text-[#2D2B3D] font-mono leading-none block">00:00:00</span>
                </div>

                <div className="bg-[#FFFFFF] border border-[#ECEAF4] rounded-2xl px-4 py-2 flex items-center gap-3">
                  <div className="relative w-9 h-9">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36"><circle cx="18" cy="18" r="15" fill="none" stroke="#ECEAF4" strokeWidth="3"/><circle cx="18" cy="18" r="15" fill="none" stroke="#8B7EC8" strokeWidth="3" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="54"/></svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-[#2D2B3D]">3/7</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-[#8E8BA0] leading-tight">Задач</p>
                    <p className="text-xs font-bold text-[#2D2B3D] leading-tight">Сегодня</p>
                  </div>
                </div>
                <div className="w-9 h-9 bg-[#D4E84D] rounded-full flex items-center justify-center cursor-pointer hover:bg-[#B8CC35] transition shadow-sm">
                  <span className="text-[#2D2B3D] text-sm font-bold">А</span>
                </div>
              </div>
            </div>
            
            {/* Саб-хэдер (Суббота). Убрана двойная линия (border-t удален), стрелочки прижаты к тексту (gap-3) */}
            <div className="flex items-center px-6 py-3">
              <div className="flex items-center gap-3">
                <button className="w-7 h-7 rounded-lg border border-[#ECEAF4] flex items-center justify-center hover:bg-[#F4F3F8] transition"><i className="ph ph-caret-left text-xs text-[#2D2B3D]"></i></button>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-[#2D2B3D]">Суббота, 5 апреля 2026</span>
                  <span className="text-[10px] text-[#B8CC35] font-bold bg-[#D4E84D]/20 px-2 py-0.5 rounded-full">Сегодня</span>
                </div>
                <button className="w-7 h-7 rounded-lg border border-[#ECEAF4] flex items-center justify-center hover:bg-[#F4F3F8] transition"><i className="ph ph-caret-right text-xs text-[#2D2B3D]"></i></button>
              </div>
            </div>
          </div>

          {/* TASK LIST */}
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">

            {/* Active Tasks */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xs font-bold text-[#2D2B3D] uppercase tracking-wider">Задачи</h2>
                <span className="text-[10px] text-[#8E8BA0] bg-[#F4F3F8] rounded-full px-2 py-0.5 font-medium">4 активных</span>
              </div>

              <div className="flex flex-col gap-2">

                {/* Task: Active with timer */}
                <div className="task-row bg-[#FFFFFF] rounded-xl p-4 border-l-[4px] border-[#FCA5A5] flex items-center gap-4 shadow-sm">
                  <button className="w-8 h-8 bg-[#F4F3F8] rounded-full flex items-center justify-center shrink-0 hover:bg-[#FCA5A5]/20 transition">
                    <i className="ph-fill ph-pause text-[#FCA5A5] text-xs"></i>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#2D2B3D]">Сервер OpenClaw</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-2 h-2 rounded bg-[#FCA5A5]"></div>
                      <span className="text-[10px] text-[#8E8BA0]">OpenClaw</span>
                      <span className="text-[8px] text-[#FCA5A5] font-bold bg-[#FCA5A5]/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5"><i className="ph-fill ph-flag-pennant text-[8px]"></i> 8 апр</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#FCA5A5] bg-[#FCA5A5]/10 px-3 py-1.5 rounded-full animate-pulse font-mono">⏱ 01:23:45</span>
                  <div className="w-5 h-5 rounded-full border-2 border-[#8E8BA0]/25 cursor-pointer hover:border-[#8B7EC8] hover:bg-[#8B7EC8]/5 transition shrink-0"></div>
                  <button className="w-6 h-6 rounded-lg hover:bg-[#F4F3F8] flex items-center justify-center transition"><i className="ph ph-dots-three text-[#8E8BA0] text-sm"></i></button>
                </div>

                {/* Task: Expanded */}
                <div className="bg-[#FFFFFF] rounded-xl border-l-[4px] border-[#B8ADE8] shadow-sm">
                  <div className="task-row flex items-center gap-4 p-4 cursor-pointer">
                    <button className="w-8 h-8 bg-[#F4F3F8] rounded-full flex items-center justify-center shrink-0 hover:bg-[#D0C8F0]/30 transition">
                      <i className="ph ph-play text-[#8B7EC8] text-xs"></i>
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#2D2B3D]">Дизайн Book Tracker</p>
                      <div className="flex items-center gap-2 mt-0.5 cursor-pointer hover:opacity-70 transition" title="Сменить проект">
                        <div className="w-2 h-2 rounded bg-[#B8ADE8]"></div>
                        <span className="text-[10px] text-[#8E8BA0] hover:text-[#8B7EC8] transition">Book Tracker</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#8B7EC8] font-bold bg-[#B8ADE8]/10 px-2.5 py-1 rounded-full cursor-pointer hover:bg-[#B8ADE8]/20 transition" title="Изменить время">1ч 20м</span>
                    <div className="w-5 h-5 rounded-full border-2 border-[#8E8BA0]/25 cursor-pointer hover:border-[#8B7EC8] hover:bg-[#8B7EC8]/5 transition shrink-0"></div>
                    <button className="w-7 h-7 rounded-lg hover:bg-[#F4F3F8] flex items-center justify-center transition"><i className="ph ph-dots-three text-[#8E8BA0] text-sm"></i></button>
                  </div>
                  <div className="px-4 pb-4 pt-0 ml-12 border-t border-[#ECEAF4]/50 mt-0">
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-[#B8CC35] bg-[#D4E84D] flex items-center justify-center"><i className="ph-bold ph-check text-[#2D2B3D] text-[6px]"></i></div>
                        <span className="text-[12px] text-[#2D2B3D]/40 line-through">Выбрать палитру</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-[#8E8BA0]/30 cursor-pointer hover:border-[#8B7EC8] transition"></div>
                        <span className="text-[12px] text-[#2D2B3D]">Нарисовать иконки</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 rounded-full border border-[#8E8BA0]/30 cursor-pointer hover:border-[#8B7EC8] transition"></div>
                        <span className="text-[12px] text-[#2D2B3D]">Собрать экран профиля</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-3.5 h-3.5 shrink-0"></div>
                        <input type="text" placeholder="+ подзадача..." className="text-[11px] text-[#8E8BA0] bg-transparent outline-none placeholder:text-[#8E8BA0]/30 w-full" />
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-[#ECEAF4]/50">
                      <div className="flex items-start gap-2">
                        <i className="ph ph-note-pencil text-[#8E8BA0]/30 text-sm mt-0.5"></i>
                        <input type="text" placeholder="Заметка..." defaultValue="Референсы на Pinterest — доска Book UI" className="text-[11px] text-[#2D2B3D]/60 bg-transparent outline-none placeholder:text-[#8E8BA0]/30 w-full" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Task: Normal */}
                <div className="task-row bg-[#FFFFFF] rounded-xl p-4 border-l-[4px] border-[#B8CC35] flex items-center gap-4">
                  <button className="w-8 h-8 bg-[#F4F3F8] rounded-full flex items-center justify-center shrink-0 hover:bg-[#D4E84D]/20 transition">
                    <i className="ph ph-play text-[#B8CC35] text-xs"></i>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#2D2B3D]">INCI парсер</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-2 h-2 rounded bg-[#D4E84D]"></div>
                      <span className="text-[10px] text-[#8E8BA0]">Beauty Tracker</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8E8BA0] font-medium">—</span>
                  <div className="w-5 h-5 rounded-full border-2 border-[#8E8BA0]/25 cursor-pointer hover:border-[#8B7EC8] hover:bg-[#8B7EC8]/5 transition shrink-0"></div>
                  <button className="w-6 h-6 rounded-lg hover:bg-[#F4F3F8] flex items-center justify-center transition"><i className="ph ph-dots-three text-[#8E8BA0] text-sm"></i></button>
                </div>

                {/* Task: Normal */}
                <div className="task-row bg-[#FFFFFF] rounded-xl p-4 border-l-[4px] border-[#FDE68A] flex items-center gap-4">
                  <button className="w-8 h-8 bg-[#F4F3F8] rounded-full flex items-center justify-center shrink-0 hover:bg-[#FDE68A]/30 transition">
                    <i className="ph ph-play text-yellow-500 text-xs"></i>
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#2D2B3D]">Колловримо — глава</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-2 h-2 rounded bg-[#FDE68A]"></div>
                      <span className="text-[10px] text-[#8E8BA0]">Личное</span>
                    </div>
                  </div>
                  <span className="text-[11px] text-[#8E8BA0] font-medium">—</span>
                  <div className="w-5 h-5 rounded-full border-2 border-[#8E8BA0]/25 cursor-pointer hover:border-[#8B7EC8] hover:bg-[#8B7EC8]/5 transition shrink-0"></div>
                  <button className="w-6 h-6 rounded-lg hover:bg-[#F4F3F8] flex items-center justify-center transition"><i className="ph ph-dots-three text-[#8E8BA0] text-sm"></i></button>
                </div>

              </div>
            </div>

            {/* Completed Tasks */}
            <div className="mt-8">
              <div className="flex items-center gap-2 mb-3">
                <h2 className="text-xs font-bold text-[#2D2B3D] uppercase tracking-wider">Выполнено</h2>
                <span className="text-[10px] text-[#8E8BA0] bg-[#F4F3F8] rounded-full px-2 py-0.5 font-medium">3 задачи</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="rounded-xl p-4 border-l-[4px] border-[#ECEAF4] flex items-center gap-4 opacity-50 bg-[#FFFFFF]">
                  <div className="w-5 h-5 rounded-full border-2 border-[#2D2B3D] bg-[#2D2B3D] flex items-center justify-center shrink-0 cursor-pointer">
                    <i className="ph-bold ph-check text-white text-[8px]"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#2D2B3D] line-through">Сравнить файлы</p>
                    <span className="text-[10px] text-[#8E8BA0]">Beauty Tracker</span>
                  </div>
                  <span className="text-[11px] text-[#8E8BA0] font-medium">30м</span>
                </div>
                <div className="rounded-xl p-4 border-l-[4px] border-[#ECEAF4] flex items-center gap-4 opacity-50 bg-[#FFFFFF]">
                  <div className="w-5 h-5 rounded-full border-2 border-[#2D2B3D] bg-[#2D2B3D] flex items-center justify-center shrink-0 cursor-pointer">
                    <i className="ph-bold ph-check text-white text-[8px]"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#2D2B3D] line-through">Экран Полки</p>
                    <span className="text-[10px] text-[#8E8BA0]">Beauty Tracker</span>
                  </div>
                  <span className="text-[11px] text-[#8E8BA0] font-medium">1ч 20м</span>
                </div>
                <div className="rounded-xl p-4 border-l-[4px] border-[#ECEAF4] flex items-center gap-4 opacity-50 bg-[#FFFFFF]">
                  <div className="w-5 h-5 rounded-full border-2 border-[#2D2B3D] bg-[#2D2B3D] flex items-center justify-center shrink-0 cursor-pointer">
                    <i className="ph-bold ph-check text-white text-[8px]"></i>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-semibold text-[#2D2B3D] line-through">Кэш в браузере</p>
                    <span className="text-[10px] text-[#8E8BA0]">Личное</span>
                  </div>
                  <span className="text-[11px] text-[#8E8BA0] font-medium">5м</span>
                </div>
              </div>
            </div>

            <div className="mt-6 mb-2">
              <input type="text" placeholder="+ Добавить задачу..." className="w-full text-sm text-[#8E8BA0] bg-[#F4F3F8]/50 border-2 border-[#8B7EC8]/30 rounded-xl px-4 py-3 outline-none focus:border-[#D4E84D] focus:ring-1 focus:ring-[#D4E84D]/40 placeholder:text-[#8E8BA0]/40 transition" />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
