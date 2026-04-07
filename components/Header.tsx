"use client";

import { usePathname } from "next/navigation";
import { useUser } from "../lib/auth";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";
import Stopwatch from "./Stopwatch";

const tabs = [
  { key: "week", label: "Неделя", href: "/week" },
  { key: "day", label: "День", href: "/day" },
  { key: "month", label: "Месяц", href: "/month" },
];

export default function Header({ title }: { title: string }) {
  const pathname = usePathname();
  const activeTab = pathname?.replace("/", "") || "week";
  const { user } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="bg-surface border-b border-grid-line px-6 py-3 flex items-center justify-between shrink-0">
      <h2 className="text-lg font-extrabold text-text-dark">{title}</h2>

      <div className="flex items-center gap-4">
        {/* Free stopwatch */}
        <div className="hidden md:flex items-center gap-2 bg-main-bg rounded-lg px-3 py-1.5">
          <i className="ph ph-timer text-text-muted text-xs"></i>
          <Stopwatch compact={false} />
        </div>

        <div className="flex gap-1.5">
          {tabs.map((tab) => (
            <a key={tab.key} href={tab.href}
              className={`text-xs font-bold px-4 py-1.5 rounded-full transition ${activeTab === tab.key ? "bg-sidebar text-white" : "text-text-muted hover:text-text-dark hover:ring-1 hover:ring-sidebar/40"}`}>
              {tab.label}
            </a>
          ))}
        </div>

        {user && (
          <button onClick={handleLogout} className="text-text-muted hover:text-red-400 transition ml-2" title="Выйти">
            <i className="ph ph-sign-out text-lg"></i>
          </button>
        )}
      </div>
    </header>
  );
}
