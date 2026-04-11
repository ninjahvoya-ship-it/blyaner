"use client";

import { useProjects } from "../hooks/useProjects";
import UserProfile from "./sidebar/UserProfile";
import NavMenu from "./sidebar/NavMenu";
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

      {/* Сон, Задачи на неделю (заглушки) */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Сон</h3>
        </div>
        <p className="text-[9px] text-white/30 mb-2">Нет данных</p>
        <div className="flex gap-1.5">
            <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><i className="ph ph-moon text-[11px]"></i> Сплю</button>
            <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1"><i className="ph ph-sun text-[11px]"></i> Встала</button>
        </div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold">На неделю</h3>
            <button className="w-5 h-5 rounded bg-white/15 flex items-center justify-center hover:bg-white/25 transition"><i className="ph-bold ph-plus text-[8px]"></i></button>
        </div>
        <p className="text-[10px] text-white/25 italic">Пока пусто</p>
      </div>

      {/* Проекты */}
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
