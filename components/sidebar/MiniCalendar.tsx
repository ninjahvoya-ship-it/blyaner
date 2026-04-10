export default function MiniCalendar() {
  const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
  
  // Упрощенная логика генерации календаря (только для визуала)
  const now = new Date();
  const today = now.getDate();
  const cells = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2 > 0 && i - 2 <= 30 ? i - 2 : null;
    return { day, isToday: day === today, isCurrentMonth: day !== null };
  });

  return (
    <div className="bg-white/5 rounded-2xl p-4 mb-8">
      <div className="flex items-center justify-between mb-3 text-sm font-bold">
        <span>Апрель 2026</span>
        <div className="flex gap-1">
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition"><i className="ph ph-caret-left text-xs" /></button>
          <button className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition"><i className="ph ph-caret-right text-xs" /></button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-1">
        {WEEKDAYS.map(d => <div key={d} className="text-[10px] font-bold text-white/30">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {cells.map((cell, i) => (
          <div 
            key={i} 
            className={`text-xs py-1.5 rounded cursor-pointer transition ${
              cell.isToday ? "bg-lime-card text-text-dark font-bold" : 
              cell.isCurrentMonth ? "text-white/80 hover:bg-white/10" : "text-transparent"
            }`}
          >
            {cell.day || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
