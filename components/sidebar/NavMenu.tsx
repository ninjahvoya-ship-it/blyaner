import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavMenu() {
  const pathname = usePathname() || '';

  const links = [
    { href: "/week", icon: "ph-calendar-blank", label: "Твоя неделя" },
    { href: "/month", icon: "ph-calendar-check", label: "Твой месяц" },
    { href: "/profile", icon: "ph-user", label: "Профиль" },
    { href: "/settings", icon: "ph-gear", label: "Настройки" },
  ];

  return (
    <nav className="flex flex-col gap-1 mb-8">
      {links.map((link) => {
        const isActive = pathname.startsWith(link.href);
        return (
          <Link 
            key={link.href} 
            href={link.href} 
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${
              isActive ? "bg-white/10 font-bold" : "text-white/60 hover:bg-white/5 hover:text-white"
            }`}
          >
            <i className={`ph ${link.icon} text-lg ${isActive ? "text-white" : ""}`} />
            <span className="text-sm">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
