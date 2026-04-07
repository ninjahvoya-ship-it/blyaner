export default function Sidebar({ activePage }: { activePage: string }) {
  const days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
  const calendarDays = [
    { day: 30, prev: true }, { day: 31, prev: true },
    { day: 1 }, { day: 2 }, { day: 3 }, { day: 4 }, { day: 5, today: true },
    { day: 6 }, { day: 7 }, { day: 8 }, { day: 9 }, { day: 10 }, { day: 11 }, { day: 12 },
    { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, { day: 17 }, { day: 18 }, { day: 19 },
    { day: 20 }, { day: 21 }, { day: 22 }, { day: 23 }, { day: 24 }, { day: 25 }, { day: 26 },
    { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 },
  ];

  return (
    <div className="w-[260px] bg-sidebar text-white p-5 flex flex-col shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-sm">📅</div>
        <span className="font-bold">Бля, Ань</span>
      </div>

      {/* Mini Calendar */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold">Апрель 2026</span>
          <div className="flex gap-1">
            <button className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[8px]">←</button>
            <button className="w-5 h-5 rounded bg-white/10 flex items-center justify-center text-[8px]">→</button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-0.5 text-center text-[9px]">
          {days.map(d => <span key={d} className="text-white/40 py-0.5">{d}</span>)}
          {calendarDays.map((d, i) => (
            <span key={i} className={`py-0.5 ${d.today ? 'bg-lime-card text-text-dark rounded font-bold' : d.prev ? 'text-white/30' : ''}`}>
              {d.day}
            </span>
          ))}
        </div>
      </div>

      {/* Sleep */}
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">Сон</h3>
        <div className="flex items-end justify-between gap-1 h-[36px] mb-2">
          {[70,50,25,80,55,0,0].map((h, i) => (
            <div key={i} className="flex-1 bg-white/10 rounded-t h-full">
              {h > 0 && <div className={`w-full rounded-t ${h < 30 ? 'bg-pink-300/60' : 'bg-lime-card/60'}`} style={{height: `${h}%`, marginTop: `${100-h}%`}} />}
            </div>
          ))}
        </div>
        <p className="text-[9px] text-white/40 mb-2">Среднее: <b className="text-white">5.8 ч</b></p>
        <div className="flex gap-1.5">
          <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg">🌙 Сплю</button>
          <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg">☀️ Встала</button>
        </div>
      </div>

      {/* Weekly Goals */}
      {(activePage === 'week' || activePage === 'day') && (
        <div className="mb-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold">На неделю</h3>
            <button className="w-5 h-5 rounded bg-white/15 flex items-center justify-center text-[8px] font-bold hover:bg-white/25 transition">+</button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border border-white/30" />
              <span className="text-[11px]">Выбрать стиль Beauty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border border-lime-card bg-lime-card/30 flex items-center justify-center text-lime-card text-[6px]">✓</div>
              <span className="text-[11px] text-white/40 line-through">Спек Планера</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full border border-white/30" />
              <span className="text-[11px]">Поднять OpenClaw</span>
            </div>
          </div>
        </div>
      )}

      {/* Projects */}
      {(activePage === 'week' || activePage === 'day') && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xs font-bold">Проекты</h3>
            <button className="w-5 h-5 rounded bg-white/15 flex items-center justify-center text-[8px] font-bold hover:bg-white/25 transition">+</button>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { name: 'Book Tracker', color: 'bg-purple-card' },
              { name: 'Beauty Tracker', color: 'bg-lime-card' },
              { name: 'OpenClaw', color: 'bg-pink-300' },
              { name: 'Личное', color: 'bg-yellow-300' },
            ].map(p => (
              <div key={p.name} className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded ${p.color}`} />
                <span className="text-[11px] text-white/70">{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
