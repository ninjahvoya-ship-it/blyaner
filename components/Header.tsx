import Link from "next/link";

export default function Header({ title, activeTab }: { title: string; activeTab: string }) {
  const tabs = [
    { key: "day", label: "День", href: "/day" },
    { key: "week", label: "Неделя", href: "/week" },
    { key: "month", label: "Месяц", href: "/month" },
  ];

  return (
    <div className="bg-surface border-b border-grid-line">
      <div className="flex justify-between items-center px-5 pt-3 pb-3">
        <h1 className="text-lg font-extrabold text-text-dark">{title}</h1>
        <div className="flex items-center gap-5">
          <div className="flex gap-0.5 bg-main-bg rounded-full p-0.5">
            {tabs.map((tab) => (
              <Link
                key={tab.key}
                href={tab.href}
                className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${
                  activeTab === tab.key
                    ? "bg-sidebar text-white"
                    : "text-text-muted hover:text-text-dark"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>
          <div className="w-9 h-9 bg-lime-card rounded-full flex items-center justify-center cursor-pointer hover:bg-lime-dark transition shadow-sm">
            <span className="text-text-dark text-sm font-bold">А</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 px-5 py-3 border-t border-grid-line">
        <button className="w-7 h-7 rounded-lg border border-grid-line flex items-center justify-center hover:bg-main-bg transition">←</button>
        <span className="text-sm font-bold text-text-dark">31 мар — 6 апр 2026</span>
        <button className="w-7 h-7 rounded-lg border border-grid-line flex items-center justify-center hover:bg-main-bg transition">→</button>
      </div>
    </div>
  );
}
