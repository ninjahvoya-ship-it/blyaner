"use client";

import { usePathname } from "next/navigation";

const tabs = [
  { key: "week", label: "Неделя", href: "/week" },
  { key: "day", label: "День", href: "/day" },
  { key: "month", label: "Месяц", href: "/month" },
];

export default function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const activeTab = pathname?.replace("/", "") || "week";

  return (
    <header className="bg-surface border-b border-grid-line px-6 py-4 flex items-center justify-between shrink-0">
      <h2 className="text-lg font-extrabold text-text-dark">{title}</h2>
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <a key={tab.key} href={tab.href}
            className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${activeTab === tab.key ? "bg-sidebar text-white" : "text-text-muted hover:text-text-dark hover:ring-1 hover:ring-sidebar/40"}`}>
            {tab.label}
          </a>
        ))}
      </div>
    </header>
  );
}
