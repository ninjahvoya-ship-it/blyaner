"use client";

import { useTasks } from "../hooks/useTasks";
import DayColumn from "./week/DayColumn";

const dayHeaders = [
  { key: 'mon', day: 'ПН', offset: 0 },
  { key: 'tue', day: 'ВТ', offset: 1 },
  { key: 'wed', day: 'СР', offset: 2 },
  { key: 'thu', day: 'ЧТ', offset: 3 },
  { key: 'fri', day: 'ПТ', offset: 4 },
  { key: 'sat', day: 'СБ', offset: 5 },
  { key: 'sun', day: 'ВС', offset: 6 },
];

function getWeekDates() {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const monday = new Date(now);
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));
  return dayHeaders.map((_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d.toISOString().split('T')[0];
  });
}

export default function WeekGrid() {
  const weekDates = getWeekDates();
  // TODO: Передавать startDate и endDate в useTasks
  const { tasks, isLoading, addTask, toggleTask, editTask, removeTask } = useTasks();

  if (isLoading) {
    return <div className="flex-1 flex items-center justify-center text-text-dark/40">Загрузка задач...</div>;
  }

  return (
    <div className="flex-1 flex bg-white rounded-tl-3xl shadow-inner overflow-x-auto custom-scrollbar">
      {dayHeaders.map((header, index) => {
        const dateStr = weekDates[index];
        const dayTasks = tasks.filter(t => t.date === dateStr);
        
        return (
          <DayColumn 
            key={dateStr}
            date={dateStr}
            dayName={header.day}
            tasks={dayTasks}
            onAddTask={(text) => addTask(text, dateStr)}
            onToggleTask={toggleTask}
            onEditTask={editTask}
            onDeleteTask={removeTask}
          />
        );
      })}
    </div>
  );
}
