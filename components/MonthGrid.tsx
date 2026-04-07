"use client";

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];

type DayCell = {
  day: number;
  prev?: boolean;
  next?: boolean;
  today?: boolean;
  tasks?: { name: string; color: string; deadline?: boolean }[];
  extra?: number;
};

const weeks: DayCell[][] = [
  [
    { day: 30, prev: true }, { day: 31, prev: true },
    { day: 1, tasks: [{ name: 'Мудборд', color: 'bg-purple-card' }, { name: 'Файлы Beauty', color: 'bg-lime-card' }] },
    { day: 2, tasks: [{ name: 'Спек планера', color: 'bg-purple-card' }] },
    { day: 3, tasks: [{ name: 'Карточки Beauty', color: 'bg-lime-card' }, { name: 'Бот Telegram', color: 'bg-pink-300' }] },
    { day: 4, tasks: [{ name: 'Тредс посты', color: 'bg-yellow-300' }] },
    { day: 5, today: true, tasks: [{ name: 'Дизайн Book', color: 'bg-purple-card' }, { name: 'INCI парсер', color: 'bg-lime-card' }, { name: 'OpenClaw', color: 'bg-pink-300' }], extra: 1 },
  ],
  [
    { day: 7, tasks: [{ name: 'Бэкап Кики', color: 'bg-pink-300' }, { name: 'Маскот Book', color: 'bg-purple-card' }] },
    { day: 8, tasks: [{ name: 'OpenClaw', color: 'bg-pink-300', deadline: true }] },
    { day: 9 }, { day: 10, tasks: [{ name: 'Полка Beauty', color: 'bg-lime-card' }] },
    { day: 11 }, { day: 12, tasks: [{ name: 'Колловримо', color: 'bg-yellow-300' }] }, { day: 13 },
  ],
  [
    { day: 14 }, { day: 15, tasks: [{ name: 'Login экран', color: 'bg-purple-card' }] },
    { day: 16 }, { day: 17 },
    { day: 18, tasks: [{ name: 'Календарь', color: 'bg-lime-card' }, { name: 'Профиль Book', color: 'bg-purple-card' }] },
    { day: 19 }, { day: 20 },
  ],
  [
    { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 }, { day: 27 },
  ],
  [
    { day: 28 }, { day: 29 }, { day: 30 },
    { day: 1, next: true }, { day: 2, next: true }, { day: 3, next: true }, { day: 4, next: true },
  ],
];

export default function MonthGrid() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-surface border-b border-grid-line sticky top-0 z-10">
        {weekDays.map(d => (
          <div key={d} className="px-2 py-2 text-center text-[10px] font-bold text-text-muted">{d}</div>
        ))}
      </div>

      {/* Weeks */}
      <div className="flex-1 flex flex-col">
        {weeks.map((week, wi) => (
          <div key={wi} className="grid grid-cols-7 flex-1">
            {week.map((cell, ci) => (
              <div
                key={ci}
                className={`border-r border-b border-grid-line p-2 cursor-pointer transition hover:bg-sidebar/[0.03] last:border-r-0
                  ${cell.prev || cell.next ? 'bg-main-bg' : 'bg-white'}
                  ${cell.today ? 'bg-lime-card/10' : ''}
                `}
              >
                {cell.today ? (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-white font-bold bg-lime-dark w-5 h-5 rounded-full flex items-center justify-center">{cell.day}</span>
                    <span className="text-[8px] text-lime-dark font-bold">сегодня</span>
                  </div>
                ) : (
                  <span className={`text-[11px] font-bold ${cell.prev || cell.next ? 'text-text-muted/40' : 'text-text-dark'}`}>{cell.day}</span>
                )}

                {cell.tasks && (
                  <div className="mt-1.5 space-y-1">
                    {cell.tasks.map((task, ti) => (
                      <div key={ti} className="flex items-center gap-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${task.color} shrink-0`} />
                        <p className="text-[9px] text-text-dark truncate">{task.name}</p>
                        {task.deadline && <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" title="Дедлайн" />}
                      </div>
                    ))}
                    {cell.extra && <p className="text-[8px] text-text-muted">+{cell.extra} ещё</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
