"use client";

import { useTasks } from "../hooks/useTasks";
import MonthCell from "./month/MonthCell";

const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

function getMonthDates() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  
  const firstDay = new Date(year, month, 1);
  let startDow = firstDay.getDay();
  if (startDow === 0) startDow = 7; // Вс = 7
  
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  
  const cells: { date: string; dayNumber: number; isCurrentMonth: boolean; isToday: boolean }[] = [];
  
  // Дни предыдущего месяца
  for (let i = startDow - 1; i > 0; i--) {
    const d = daysInPrev - i + 1;
    cells.push({ 
      date: new Date(year, month - 1, d).toISOString().split('T')[0],
      dayNumber: d, 
      isCurrentMonth: false, 
      isToday: false 
    });
  }
  
  // Текущий месяц
  const todayStr = now.toISOString().split('T')[0];
  for (let i = 1; i <= daysInMonth; i++) {
    const dStr = new Date(year, month, i).toISOString().split('T')[0];
    cells.push({ 
      date: dStr,
      dayNumber: i, 
      isCurrentMonth: true, 
      isToday: dStr === todayStr 
    });
  }
  
  // Добиваем пустые ячейки (до 35)
  const remaining = 35 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({ 
      date: new Date(year, month + 1, i).toISOString().split('T')[0],
      dayNumber: i, 
      isCurrentMonth: false, 
      isToday: false 
    });
  }
  
  return cells;
}

export default function MonthGrid() {
  const { tasks, isLoading } = useTasks();
  const cells = getMonthDates();

  if (isLoading) return <div className="p-8 text-[#8E8A84]">Загрузка календаря...</div>;

  return (
    <div className="flex-1 flex flex-col bg-white rounded-tl-3xl shadow-inner overflow-hidden">
      
      {/* Шапка дней недели */}
      <div className="grid grid-cols-7 bg-[#F9F9FB] border-b border-[#0000000D] sticky top-0 z-10">
        {WEEKDAYS.map(d => (
          <div key={d} className="px-2 py-2 text-center text-[10px] font-bold text-[#8E8A84]">
            {d}
          </div>
        ))}
      </div>

      {/* Сетка дней */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5 custom-scrollbar">
        {cells.map((cell, idx) => {
          const dayTasks = tasks.filter(t => t.date === cell.date);
          return (
            <MonthCell 
              key={idx}
              date={cell.date}
              dayNumber={cell.dayNumber}
              isCurrentMonth={cell.isCurrentMonth}
              isToday={cell.isToday}
              tasks={dayTasks}
              onClick={() => console.log('Go to day', cell.date)}
            />
          );
        })}
      </div>

    </div>
  );
}
