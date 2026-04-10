import { Task } from "../../lib/tasks";

interface Props {
  date: string;
  dayNumber: number;
  isToday: boolean;
  isCurrentMonth: boolean;
  tasks: Task[];
  onClick: () => void;
}

export default function MonthCell({ date, dayNumber, isToday, isCurrentMonth, tasks, onClick }: Props) {
  const visibleTasks = tasks.slice(0, 3);
  const extraCount = tasks.length > 3 ? tasks.length - 3 : 0;

  if (!isCurrentMonth) {
    return (
      <div className="border-r border-b border-[#0000000D] p-2 bg-[#FBFAF5]">
        <span className="text-[11px] text-[#8E8A84]/40 font-medium">{dayNumber}</span>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className={`border-r border-b border-[#0000000D] p-2 cursor-pointer transition ${isToday ? 'bg-[#C2D629]/10' : 'bg-white hover:bg-[#F9F9FB]'}`}
    >
      {isToday ? (
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-white font-bold bg-[#B8CC35] w-5 h-5 rounded-full flex items-center justify-center">
            {dayNumber}
          </span>
          <span className="text-[8px] text-[#B8CC35] font-bold uppercase">сегодня</span>
        </div>
      ) : (
        <span className="text-[11px] text-[#222222] font-bold">{dayNumber}</span>
      )}

      <div className="mt-1.5 space-y-1">
        {visibleTasks.map(task => {
          const color = task.project?.color || '#8E8A84';
          return (
            <div key={task.id} className="flex items-center gap-1 opacity-80">
              <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
              <p className={`text-[9px] truncate ${task.done ? 'line-through text-[#8E8A84]' : 'text-[#222222]'}`}>
                {task.text}
              </p>
            </div>
          );
        })}
        {extraCount > 0 && (
          <p className="text-[8px] text-[#8E8A84] mt-0.5">+{extraCount} ещё</p>
        )}
      </div>
    </div>
  );
}
