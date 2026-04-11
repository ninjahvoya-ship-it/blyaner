"use client";

import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import FocusHeader from "./day/FocusHeader";
import DetailedTaskItem from "./day/DetailedTaskItem";
import EmptyDay from "./day/EmptyDay";

export default function DayList() {
  const today = new Date().toISOString().split('T')[0];
  const { tasks, isLoading, addTask, toggleTask, editTask, removeTask } = useTasks();

  const [newTaskText, setNewTaskText] = useState("");

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center p-8 text-text-muted">Загрузка задач...</div>;
  }

  const todaysTasks = tasks.filter(t => t.date === today);
  const doneTasks = todaysTasks.filter(t => t.done);
  const activeTasks = todaysTasks.filter(t => !t.done);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTaskText.trim() !== '') {
      addTask(newTaskText.trim(), today);
      setNewTaskText("");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-main-bg relative h-full">
      
      <FocusHeader date={today} />

      {todaysTasks.length === 0 ? (
        <EmptyDay 
          onAddTask={(text) => addTask(text, today)} 
          newTaskText={newTaskText} 
          setNewTaskText={setNewTaskText} 
          onKeyDown={handleKeyDown} 
        />
      ) : (
        <>
          <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
            <div className="w-full">

              {/* Активные задачи */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xs font-bold text-text-dark uppercase tracking-wider">Задачи</h2>
                  <span className="text-[10px] text-text-muted bg-main-bg rounded-full px-2 py-0.5 font-medium border border-grid-line">
                    {activeTasks.length} активных
                  </span>
                </div>

                <div className="flex flex-col gap-2">
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
              </div>

              {/* Завершенные задачи */}
              {doneTasks.length > 0 && (
                <div className="mt-8">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-xs font-bold text-text-dark uppercase tracking-wider">Выполнено</h2>
                  </div>
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
          </div>

          {/* Инпут (sticky bottom) */}
          <div className="px-6 py-6 bg-gradient-to-t from-main-bg via-main-bg to-transparent sticky bottom-0 z-10">
            <div className="w-full">
              <input 
                type="text" 
                placeholder="+ Добавить задачу..." 
                value={newTaskText}
                onChange={e => setNewTaskText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full text-sm text-text-muted bg-surface border-2 border-grid-line rounded-xl px-4 py-3 outline-none focus:border-lime-card focus:ring-1 focus:ring-lime-card/40 placeholder:text-text-muted/40 transition" 
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
