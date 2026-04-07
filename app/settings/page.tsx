import Sidebar from "../../components/Sidebar";

export default function SettingsPage() {
  const settingRow = "flex items-center gap-4 px-5 py-3.5 cursor-pointer transition hover:bg-sidebar/[0.03]";

  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#E8E6F0]">
      <div className="max-w-[1440px] mx-auto bg-main-bg rounded-[32px] shadow-xl overflow-hidden flex min-h-[93vh]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="bg-surface border-b border-grid-line">
            <div className="flex justify-between items-center px-6 pt-3 pb-3">
              <h1 className="text-lg font-extrabold text-text-dark">Твои настройки</h1>
              <div className="flex items-center gap-5">
                <div className="flex gap-0.5 bg-main-bg rounded-full p-0.5">
                  <a href="/day" className="text-text-muted text-xs font-bold px-4 py-1.5 rounded-full hover:text-text-dark hover:ring-1 hover:ring-sidebar/40 transition">День</a>
                  <a href="/week" className="text-text-muted text-xs font-bold px-4 py-1.5 rounded-full hover:text-text-dark hover:ring-1 hover:ring-sidebar/40 transition">Неделя</a>
                  <a href="/month" className="text-text-muted text-xs font-bold px-4 py-1.5 rounded-full hover:text-text-dark hover:ring-1 hover:ring-sidebar/40 transition">Месяц</a>
                </div>
                <a href="/profile" className="w-9 h-9 bg-lime-card rounded-full flex items-center justify-center hover:bg-lime-dark transition shadow-sm">
                  <span className="text-text-dark text-sm font-bold">А</span>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            <div className="grid grid-cols-2 gap-4">
              {/* Widgets */}
              <div className="bg-white rounded-2xl overflow-hidden self-start">
                <div className="px-5 pt-4 pb-2">
                  <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Виджеты</h3>
                </div>
                {[
                  { icon: 'ph-moon', name: 'Трекер сна', desc: 'Кнопки Сплю/Встала', on: true },
                  { icon: 'ph-flame', name: 'Стрик', desc: 'Счётчик дней подряд', on: true },
                  { icon: 'ph-timer', name: 'Секундомер', desc: 'Отслеживай, сколько тратишь на задачу', on: true },
                  { icon: 'ph-flag-pennant', name: 'Дедлайны', desc: 'Ближайшие сроки', on: true },
                  { icon: 'ph-warning-circle', name: 'Незавершённые', desc: 'Задачи с прошлых дней', on: false },
                ].map((w) => (
                  <div key={w.name} className="flex items-center gap-4 px-5 py-3">
                    <div className="w-9 h-9 bg-main-bg rounded-xl flex items-center justify-center"><i className={`ph ${w.icon} text-sidebar`}></i></div>
                    <div className="flex-1">
                      <p className="text-[13px] font-medium text-text-dark">{w.name}</p>
                      <p className="text-[10px] text-text-muted">{w.desc}</p>
                    </div>
                    <div className={`w-10 h-6 rounded-full p-0.5 cursor-pointer ${w.on ? 'bg-lime-card' : 'bg-grid-line'}`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm ${w.on ? 'ml-auto' : ''}`} />
                    </div>
                  </div>
                ))}
                <div className="h-3" />
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-4">
                {/* Account */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="px-5 pt-4 pb-2">
                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Аккаунт</h3>
                  </div>
                  <div className={settingRow}>
                    <div className="w-9 h-9 bg-main-bg rounded-xl flex items-center justify-center"><i className="ph ph-user text-sidebar"></i></div>
                    <div className="flex-1"><p className="text-[13px] font-medium text-text-dark">Изменить имя</p><p className="text-[10px] text-text-muted">Аня</p></div>
                    <i className="ph ph-caret-right text-text-muted/30 text-sm"></i>
                  </div>
                  <div className={settingRow}>
                    <div className="w-9 h-9 bg-main-bg rounded-xl flex items-center justify-center"><i className="ph ph-envelope text-sidebar"></i></div>
                    <div className="flex-1"><p className="text-[13px] font-medium text-text-dark">Изменить email</p><p className="text-[10px] text-text-muted">anna@example.com</p></div>
                    <i className="ph ph-caret-right text-text-muted/30 text-sm"></i>
                  </div>
                  <div className={settingRow}>
                    <div className="w-9 h-9 bg-main-bg rounded-xl flex items-center justify-center"><i className="ph ph-lock text-sidebar"></i></div>
                    <div className="flex-1"><p className="text-[13px] font-medium text-text-dark">Сменить пароль</p></div>
                    <i className="ph ph-caret-right text-text-muted/30 text-sm"></i>
                  </div>
                  <div className={settingRow}>
                    <div className="w-9 h-9 bg-main-bg rounded-xl flex items-center justify-center"><i className="ph ph-globe text-sidebar"></i></div>
                    <div className="flex-1"><p className="text-[13px] font-medium text-text-dark">Часовой пояс</p><p className="text-[10px] text-text-muted">Europe/Moscow (UTC+3)</p></div>
                    <i className="ph ph-caret-right text-text-muted/30 text-sm"></i>
                  </div>
                  <div className="h-3" />
                </div>

                {/* Data */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="px-5 pt-4 pb-2">
                    <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Данные</h3>
                  </div>
                  <div className={settingRow}>
                    <div className="w-9 h-9 bg-main-bg rounded-xl flex items-center justify-center"><i className="ph ph-export text-sidebar"></i></div>
                    <div className="flex-1"><p className="text-[13px] font-medium text-text-dark">Экспорт данных</p><p className="text-[10px] text-text-muted">CSV или JSON</p></div>
                    <i className="ph ph-caret-right text-text-muted/30 text-sm"></i>
                  </div>
                  <div className="h-2" />
                </div>

                {/* Danger */}
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="px-5 pt-4 pb-2">
                    <h3 className="text-[10px] font-bold text-red-300 uppercase tracking-wider">Опасная зона</h3>
                  </div>
                  <div className={`${settingRow} hover:bg-red-50/50`}>
                    <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center"><i className="ph ph-trash text-red-400"></i></div>
                    <div className="flex-1"><p className="text-[13px] font-medium text-red-400">Удалить аккаунт</p><p className="text-[10px] text-text-muted">Все данные будут удалены навсегда</p></div>
                    <i className="ph ph-caret-right text-red-300/30 text-sm"></i>
                  </div>
                  <div className="h-2" />
                </div>
              </div>
            </div>

            <p className="text-center text-[10px] text-text-muted/30 mt-6">Блянер v1.0 · Бля, работает.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
