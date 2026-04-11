import { useUser } from "../../lib/auth";

export default function UserProfile() {
  const { user } = useUser();
  const emailName = user?.email ? user.email.split('@')[0] : 'Ань';
  const capitalized = emailName.charAt(0).toUpperCase() + emailName.slice(1);
  
  return (
    <div className="bg-white/10 rounded-2xl p-4 flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shadow-inner">
            <i className="ph-fill ph-notebook text-white text-xl"></i>
        </div>
        <div className="flex-1 min-w-0">
            <h2 className="text-sm font-extrabold text-white truncate">Бля, {capitalized}</h2>
            <p className="text-[10px] text-white/50 font-medium">Бесплатный тариф</p>
        </div>
    </div>
  );
}
