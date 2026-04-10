"use client";

import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import FocusHeader from "./day/FocusHeader";
import DetailedTaskItem from "./day/DetailedTaskItem";

export default function DayList() {
  const today = new Date().toISOString().split('T')[0];
  const { tasks, isLoading, addTask, toggleTask, editTask, removeTask } = useTasks();

  const [newTaskText, setNewTaskText] = useState("");

  if (isLoading) {
    return <div className="p-8 text-[#8E8A84]">Загрузка задач...</div>;
  }

  const todaysTasks = tasks.filter(t => t.date === today);
  const doneTasks = todaysTasks.filter(t => t.done);
  const activeTasks = todaysTasks.filter(t => !t.done);

  return (
    <div className="flex-1 flex flex-col bg-[#FBFAF5] rounded-tl-3xl shadow-inner overflow-hidden relative h-full">
      <div className="flex-1 overflow-y-auto px-8 py-8 custom-scrollbar">
        
        <FocusHeader date={today} />

        <div className="flex flex-col gap-3 mb-8 max-w-3xl">
          {activeTasks.map(task => (
            <DetailedTaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask} 
              onEdit={editTask} 
              onDelete={removeTask}
              onPlay={(id) => console.log('Start timer for', id)} 
            />
          ))}
        </div>

        {doneTasks.length > 0 && (
          <div className="mt-8 max-w-3xl">
            <p className="text-[10px] text-[#8E8A84] font-medium uppercase tracking-wider mb-3">Завершено</p>
            <div className="flex flex-col gap-2">
              {doneTasks.map(task => (
                <DetailedTaskItem 
                  key={task.id} 
                  task={task} 
                  onToggle={toggleTask} 
                  onEdit={editTask} 
                  onDelete={removeTask}
                  onPlay={() => {}} 
                />
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Инпут (sticky bottom) */}
      <div className="px-8 py-6 bg-gradient-to-t from-[#FBFAF5] via-[#FBFAF5] to-transparent sticky bottom-0 z-10">
        <div className="max-w-3xl">
          <input 
            type="text" 
            placeholder="+ Добавить задачу..." 
            value={newTaskText}
            onChange={e => setNewTaskText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && newTaskText.trim() !== '') {
                addTask(newTaskText.trim(), today);
                setNewTaskText("");
              }
            }}
            className="w-full text-sm text-[#8E8A84] bg-[#F9F9FB] border-2 border-[#2A2B35]/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2D629] focus:ring-1 focus:ring-[#C2D629]/40 placeholder:text-[#8E8A84]/40 transition" 
          />
        </div>
      </div>
    </div>
  );
}
