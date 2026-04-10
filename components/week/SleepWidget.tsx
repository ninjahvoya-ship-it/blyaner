interface Props {
  date: string;
}

export default function SleepWidget({ date }: Props) {
  // Заглушка. В R2 вынесем в useSleep
  return (
    <div className="bg-white rounded-xl p-2 shadow-sm border border-black/5 mb-2">
      <div className="flex gap-1">
        <button className="flex-1 bg-black/5 text-[9px] font-bold py-1.5 rounded-lg hover:bg-black/10 transition">
          <i className="ph-fill ph-moon text-[11px] mr-1 text-purple-500" /> Сплю
        </button>
        <button className="flex-1 bg-black/5 text-[9px] font-bold py-1.5 rounded-lg hover:bg-black/10 transition">
          <i className="ph-fill ph-sun text-[11px] mr-1 text-yellow-500" /> Встала
        </button>
      </div>
    </div>
  );
}
