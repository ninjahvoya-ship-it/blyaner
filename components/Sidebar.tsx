export default function Sidebar({ activePage }: { activePage: string }) {
  return (
    <div className="w-[260px] bg-sidebar text-white p-5 flex flex-col shrink-0 overflow-y-auto">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 bg-white/20 rounded-lg flex items-center justify-center text-sm font-bold">📅</div>
        <span className="font-bold">Бля, Ань</span>
      </div>
      <div className="bg-white/10 rounded-xl p-3 mb-4">
        <span className="text-xs font-bold">Апрель 2026</span>
        <p className="text-[9px] text-white/30 mt-1">Мини-календарь (в разработке)</p>
      </div>
    </div>
  );
}
