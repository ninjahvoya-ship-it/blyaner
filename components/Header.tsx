import Link from "next/link";

export default function Header({ title, activeTab }: { title: string; activeTab: string }) {
  const tabs = [
    { key: "day", label: "День", href: "/day" },
    { key: "week", label: "Неделя", href: "/week" },
    { key: "month", label: "Месяц", href: "/month" },
  ];

  return (
    <div className="bg-surface border-b border-grid-line">
      {/* Row 1 */}
      <div className="flex justify-between items-center px-5 pt-3 pb-3">
        <h1 className="text-lg font-extrabold text-text-dark">{title}</h1>
        <div className="flex items-center gap-5">
          {/* Tabs */}
          <div className="flex gap-0.5 bg-main-bg rounded-full p-0.5">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${
                  activeTab === tab.key
                    ? "bg-sidebar text-white"
                    : "text-text-muted hover:text-text-dark hover:ring-1 hover:ring-sidebar/40"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Stopwatch */}
          <div className="bg-main-bg rounded-full px-4 py-2 flex items-center gap-2">
            <div className="w-8 h-8 bg-lime-card rounded-full flex items-center justify-center">
              <span className="text-text-dark text-[10px]">▶</span>
            </div>
            <span className="text-sm font-bold text-text-dark font-mono">00:00</span>
          </div>

          {/* Tasks Progress */}
          <div className="bg-surface border border-grid-line rounded-2xl px-4 py-2 flex items-center gap-3">
            <div className="relative w-9 h-9">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15" fill="none" stroke="#ECEAF4" strokeWidth="3"/>
                <circle cx="18" cy="18" r="15" fill="none" stroke="#8B7EC8" strokeWidth="3" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="54"/>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-text-dark">3/7</span>
            </div>
            <div>
              <p className="text-[10px] text-text-muted leading-tight">Задач</p>
              <p className="text-xs font-bold text-text-dark leading-tight">Сегодня</p>
            </div>
          </div>

          {/* Avatar */}
          <div className="w-9 h-9 bg-lime-card rounded-full flex items-center justify-center cursor-pointer hover:bg-lime-dark transition shadow-sm">
            <span className="text-text-dark text-sm font-bold">А</span>
          </div>
        </div>
      </div>

      {/* Row 2 - Date */}
      <div className="flex items-center gap-4 px-5 py-3 border-t border-grid-line">
        <button className="w-7 h-7 rounded-lg border border-grid-line flex items-center justify-center hover:bg-main-bg transition text-xs text-text-dark">←</button>
        <span className="text-sm font-bold text-text-dark">31 мар — 6 апр 2026</span>
        <button className="w-7 h-7 rounded-lg border border-grid-line flex items-center justify-center hover:bg-main-bg transition text-xs text-text-dark">→</button>
      </div>
    </div>
  );
}
