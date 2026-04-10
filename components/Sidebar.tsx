"use client";

import { useProjects } from "../hooks/useProjects";
import UserProfile from "./sidebar/UserProfile";
import NavMenu from "./sidebar/NavMenu";
import MiniCalendar from "./sidebar/MiniCalendar";
import ProjectItem from "./sidebar/ProjectItem";

export default function Sidebar() {
  const { projects, isLoading, addProject } = useProjects();

  return (
    <div className="w-[260px] bg-[#2A2B35] text-white p-5 flex flex-col shrink-0 overflow-y-auto max-h-screen sticky top-0 custom-scrollbar">
      
      <UserProfile />
      <NavMenu />
      <MiniCalendar />

      {/* Проекты */}
      <div className="mt-2 flex-1">
        <h3 className="text-white/40 text-[10px] font-bold uppercase tracking-wider mb-3 px-2">
          Проекты
        </h3>
        
        {isLoading ? (
          <div className="text-white/30 text-xs px-2 py-2">Загрузка проектов...</div>
        ) : projects.length === 0 ? (
          <div className="text-white/30 text-xs px-2 py-2">Нет проектов</div>
        ) : (
          <div className="space-y-0.5">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project} />
            ))}
          </div>
        )}

        <button 
          onClick={() => addProject('Новый проект', '#B8ADE8')}
          className="mt-2 w-full flex items-center gap-2 px-2 py-2 text-white/40 hover:text-white/80 hover:bg-white/5 rounded-lg transition text-sm"
        >
          <i className="ph-bold ph-plus" /> Добавить
        </button>
      </div>

    </div>
  );
}
