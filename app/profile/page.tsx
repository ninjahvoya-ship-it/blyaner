import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

export default function ProfilePage() {
  return (
    <div className="min-h-screen p-4 md:p-6 bg-[#E8E6F0]">
      <div className="max-w-[1440px] mx-auto bg-main-bg rounded-[32px] shadow-xl overflow-hidden flex min-h-[93vh]">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <div className="bg-surface border-b border-grid-line">
            <div className="flex justify-between items-center px-6 pt-3 pb-3">
              <h1 className="text-lg font-extrabold text-text-dark">Твой профиль</h1>
              <div className="flex items-center gap-5">
                <div className="flex gap-0.5 bg-main-bg rounded-full p-0.5">
                  <a href="/day" className="text-text-muted text-xs font-bold px-4 py-1.5 rounded-full hover:text-text-dark hover:ring-1 hover:ring-sidebar/40 transition">День</a>
                  <a href="/week" className="text-text-muted text-xs font-bold px-4 py-1.5 rounded-full hover:text-text-dark hover:ring-1 hover:ring-sidebar/40 transition">Неделя</a>
                  <a href="/month" className="text-text-muted text-xs font-bold px-4 py-1.5 rounded-full hover:text-text-dark hover:ring-1 hover:ring-sidebar/40 transition">Месяц</a>
                </div>
                <div className="w-9 h-9 bg-sidebar rounded-full flex items-center justify-center shadow-sm ring-2 ring-sidebar/30">
                  <span className="text-white text-sm font-bold">А</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-5">
            {/* Avatar Card */}
            <div className="bg-white rounded-2xl p-6 mb-4 flex items-center gap-5">
              <div className="w-20 h-20 bg-lime-card rounded-2xl flex items-center justify-center shrink-0">
                <span className="text-text-dark text-3xl font-extrabold">А</span>
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-text-dark">Аня</h2>
                <p className="text-[12px] text-text-muted">anna@example.com</p>
                <p className="text-[10px] text-text-muted/40 mt-1">В Блянере с апреля 2026</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-3 mb-4 text-center">
              <div className="bg-white rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-text-dark">47</p>
                <p className="text-[10px] text-text-muted mt-1">создано</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-sidebar">23</p>
                <p className="text-[10px] text-text-muted mt-1">выполнено</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-lime-dark">18ч</p>
                <p className="text-[10px] text-text-muted mt-1">затрачено</p>
              </div>
              <div className="bg-white rounded-2xl p-4">
                <p className="text-2xl font-extrabold text-text-dark">5</p>
                <p className="text-[10px] text-text-muted mt-1">стрик</p>
                <div className="flex justify-center gap-[3px] mt-2">
                  {[1,1,1,1,1,0,0].map((on, i) => (
                    <i key={i} className={`ph-fill ph-flame text-[11px] ${on ? 'text-lime-card' : 'text-grid-line'}`}></i>
                  ))}
                </div>
                <p className="text-[8px] text-text-muted/40 mt-1">рекорд: 12</p>
              </div>
            </div>

            {/* Focus + Projects */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-white rounded-2xl p-5">
                <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider mb-4">Фокус за всё время</h3>
                <div className="flex h-4 rounded-full overflow-hidden mb-3">
                  <div className="bg-purple-card" style={{width:'40%'}} />
                  <div className="bg-lime-card" style={{width:'30%'}} />
                  <div className="bg-pink-300" style={{width:'20%'}} />
                  <div className="bg-yellow-300" style={{width:'10%'}} />
                </div>
                <div className="space-y-2">
                  {[
                    {name:'Book Tracker', color:'bg-purple-card', time:'7ч 12м'},
                    {name:'Beauty Tracker', color:'bg-lime-card', time:'5ч 24м'},
                    {name:'OpenClaw', color:'bg-pink-300', time:'3ч 36м'},
                    {name:'Личное', color:'bg-yellow-300', time:'1ч 48м'},
                  ].map(p => (
                    <div key={p.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2"><div className={`w-2.5 h-2.5 rounded ${p.color}`}/><span className="text-[11px] text-text-dark">{p.name}</span></div>
                      <span className="text-[11px] text-text-muted font-medium">{p.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-wider">Проекты</h3>
                  <button className="text-[10px] text-sidebar font-bold hover:underline">+ Добавить</button>
                </div>
                <div className="space-y-3">
                  {[
                    {name:'Book Tracker', color:'bg-purple-card', count:12},
                    {name:'Beauty Tracker', color:'bg-lime-card', count:8},
                    {name:'OpenClaw', color:'bg-pink-300', count:5},
                    {name:'Личное', color:'bg-yellow-300', count:4},
                  ].map(p => (
                    <div key={p.name} className="flex items-center gap-3 group">
                      <div className={`w-4 h-4 rounded-lg ${p.color}`}/>
                      <span className="text-[12px] text-text-dark font-medium flex-1">{p.name}</span>
                      <span className="text-[10px] text-text-muted">{p.count}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition"><i className="ph ph-pencil-simple text-text-muted text-xs"></i></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Productivity */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white rounded-2xl p-4 text-center">
                <i className="ph ph-calendar-check text-sidebar text-lg"></i>
                <p className="text-lg font-extrabold text-text-dark mt-1">Среда</p>
                <p className="text-[10px] text-text-muted">лучший день</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <i className="ph ph-clock-afternoon text-sidebar text-lg"></i>
                <p className="text-lg font-extrabold text-text-dark mt-1">15:00</p>
                <p className="text-[10px] text-text-muted">пик активности</p>
              </div>
              <div className="bg-white rounded-2xl p-4 text-center">
                <i className="ph ph-chart-line-up text-sidebar text-lg"></i>
                <p className="text-lg font-extrabold text-text-dark mt-1">3.4</p>
                <p className="text-[10px] text-text-muted">задач / день</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
