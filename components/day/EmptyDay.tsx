interface Props {
  onAddTask: (text: string) => void;
  newTaskText: string;
  setNewTaskText: (text: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function EmptyDay({ onAddTask, newTaskText, setNewTaskText, onKeyDown }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
      <i className="ph ph-coffee text-[64px] text-[#8E8A84]/15 mb-4"></i>
      <h2 className="text-xl font-extrabold text-[#222222] mb-1">Бля, свободный день!</h2>
      <p className="text-sm text-[#8E8A84]/50 mb-8">Или ты забыла добавить задачи?</p>
      
      <div className="w-full max-w-md">
        <input 
          type="text" 
          placeholder="+ Впиши первую задачу и нажми Enter..." 
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={onKeyDown}
          className="w-full text-sm text-[#8E8A84] bg-white border-2 border-[#2A2B35]/20 rounded-xl px-4 py-3.5 outline-none focus:border-[#C2D629] focus:ring-1 focus:ring-[#C2D629]/40 placeholder:text-[#8E8A84]/40 transition shadow-sm" 
        />
      </div>
    </div>
  );
}
