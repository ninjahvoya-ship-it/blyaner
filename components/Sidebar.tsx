"use client";

import { useProjects } from "../hooks/useProjects";
import MiniCalendar from "./sidebar/MiniCalendar";
import ProjectItem from "./sidebar/ProjectItem";

export default function Sidebar() {
  const { projects, isLoading, addProject } = useProjects();

  return (
    <div className="w-[260px] bg-sidebar text-white p-5 flex flex-col shrink-0 overflow-y-auto max-h-screen sticky top-0 custom-scrollbar">
      
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center">
            <i className="ph-bold ph-calendar-check text-sm"></i>
        </div>
        <span className="font-bold">Бля, Ань</span>
      </div>

      <MiniCalendar />

      {/* Sleep */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">Сон</h3>
        <div className="flex items-end justify-between gap-1 h-[36px] mb-2">
            <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-lime-card/60 rounded-t h-[70%]"></div></div>
            <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-lime-card/60 rounded-t h-[50%]"></div></div>
            <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-[#FCA5A5]/60 rounded-t h-[25%]"></div></div>
            <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-lime-card/60 rounded-t h-[80%]"></div></div>
            <div className="flex-1 bg-white/10 rounded-t h-full"><div className="w-full bg-lime-card/60 rounded-t h-[55%]"></div></div>
            <div className="flex-1 bg-white/10 rounded-t h-full"></div>
            <div className="flex-1 bg-white/10 rounded-t h-full"></div>
        </div>
        <p className="text-[9px] text-white/40 mb-2">Среднее: <b className="text-white">5.8 ч</b></p>
        <div className="flex gap-1.5">
            <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><i className="ph ph-moon text-[11px]"></i> Сплю</button>
            <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><i className="ph ph-sun text-[11px]"></i> Встала</button>
        </div>
      </div>

      {/* Weekly Goals */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold">На неделю</h3>
            <button className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition"><i className="ph-bold ph-plus text-[8px]"></i></button>
        </div>
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"></div><span className="text-[11px] truncate">Выбрать стиль Beauty</span></div>
            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-lime-card bg-lime-card/30 flex items-center justify-center shrink-0"><i className="ph-bold ph-check text-lime-card text-[6px]"></i></div><span className="text-[11px] text-white/40 line-through truncate">Спек Планера</span></div>
            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"></div><span className="text-[11px] truncate">Поднять OpenClaw</span></div>
            <div className="flex items-center gap-2"><div className="w-3.5 h-3.5 rounded-full border border-white/30 shrink-0"></div><span className="text-[11px] truncate">Пост в Тредс</span></div>
        </div>
      </div>

      {/* Projects */}
      <div className="mt-2 flex-1">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold px-2">Проекты</h3>
            <button onClick={() => addProject('Новый', '#B8ADE8')} className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition"><i className="ph-bold ph-plus text-[8px]"></i></button>
        </div>
        
        {isLoading ? (
          <div className="text-white/30 text-xs px-2 py-2">Загрузка...</div>
        ) : projects.length === 0 ? (
          <p className="text-[10px] text-white/25 italic px-2">Создай первый проект</p>
        ) : (
          <div className="space-y-0.5">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
