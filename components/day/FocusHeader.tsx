interface Props {
  date: string;
}

export default function FocusHeader({ date }: Props) {
  const d = new Date(date + 'T00:00:00');
  const dayNumber = d.getDate().toString().padStart(2, '0');
  const monthName = d.toLocaleDateString('ru', { month: 'short' });
  const dayNameFull = d.toLocaleDateString('ru', { weekday: 'long' });

  return (
    <div className="mb-8">
      <p className="text-[10px] text-[#8E8A84] font-medium uppercase tracking-wider mb-2">Твой фокус</p>
      <h2 className="text-[32px] font-bold text-[#222222] leading-none mb-1">
        {dayNumber} {monthName}
      </h2>
      <p className="text-sm text-[#8E8A84] capitalize">{dayNameFull}</p>
    </div>
  );
}
