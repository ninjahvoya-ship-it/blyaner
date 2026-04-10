interface Props {
  dateStr: string;
}

export default function MonthHeader({ dateStr }: Props) {
  const d = new Date(dateStr + 'T00:00:00');
  const monthName = d.toLocaleDateString('ru', { month: 'long', year: 'numeric' });
  const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);

  return (
    <div className="flex items-center gap-4 px-6 py-3 border-b border-[#0000000D] bg-white">
      <button className="w-7 h-7 rounded-lg border border-[#0000000D] flex items-center justify-center hover:bg-[#FBFAF5] transition">
        <i className="ph ph-caret-left text-xs text-[#222222]"></i>
      </button>
      <span className="text-sm font-bold text-[#222222]">{capitalized}</span>
      <button className="w-7 h-7 rounded-lg border border-[#0000000D] flex items-center justify-center hover:bg-[#FBFAF5] transition">
        <i className="ph ph-caret-right text-xs text-[#222222]"></i>
      </button>
    </div>
  );
}
