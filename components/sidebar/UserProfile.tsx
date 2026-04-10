import { useUser } from "../../lib/auth";

export default function UserProfile() {
  const { user } = useUser();
  const initial = user?.email ? user.email.charAt(0).toUpperCase() : 'A';
  
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-bold text-lg">
        {initial}
      </div>
      <div>
        <div className="font-bold text-sm">Твоё пространство</div>
        <div className="text-[11px] text-white/50">{user?.email || 'Загрузка...'}</div>
      </div>
    </div>
  );
}
