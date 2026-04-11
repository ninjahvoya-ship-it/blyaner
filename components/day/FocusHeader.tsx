interface Props {
  date: string;
}

export default function FocusHeader({ date }: Props) {
  const d = new Date(date + 'T00:00:00');
  
  const dayNameFull = d.toLocaleDateString('ru', { weekday: 'long' });
  const dayNameCapitalized = dayNameFull.charAt(0).toUpperCase() + dayNameFull.slice(1);
  
  const dayNumber = d.getDate();
  
  // Правильный русский родительный падеж для месяцев без TS-ошибок
  const monthsGenitive = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
  const monthName = monthsGenitive[d.getMonth()];
  const year = d.getFullYear();

  const formattedDate = `${dayNameCapitalized}, ${dayNumber} ${monthName} ${year}`;
  
  const todayStr = new Date().toISOString().split('T')[0];
  const isToday = date === todayStr;

  return (
    <div className="flex items-center gap-4 px-6 py-3 border-b border-[#0000000D] bg-white sticky top-0 z-10 w-full">
      <button className="w-7 h-7 rounded-lg border border-[#0000000D] flex items-center justify-center hover:bg-[#FBFAF5] transition shrink-0">
        <i className="ph ph-caret-left text-xs text-[#222222]"></i>
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-[#222222]">{formattedDate}</span>
        {isToday && (
          <span className="text-[10px] text-[#B8CC35] font-bold bg-[#C2D629]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
            Сегодня
          </span>
        )}
      </div>

      <button className="w-7 h-7 rounded-lg border border-[#0000000D] flex items-center justify-center hover:bg-[#FBFAF5] transition shrink-0">
        <i className="ph ph-caret-right text-xs text-[#222222]"></i>
      </button>
    </div>
  );
}
