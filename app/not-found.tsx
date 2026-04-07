export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ background: "linear-gradient(160deg, #7A6DB8 0%, #8B7EC8 35%, #9D92D4 100%)" }}>
      <div className="w-full max-w-[440px] relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="bg-white/10 rounded-xl p-5 text-center">
          <h1 className="text-5xl font-extrabold text-white mb-2">404</h1>
          <p className="text-sm text-white/50 mb-4">Бля, тут ничего нет</p>
          <p className="text-[12px] text-white/40 mb-5">Страница потерялась. Наверное, прокрастинирует где-то.</p>
          <a href="/week" className="inline-flex items-center justify-center gap-2 bg-lime-card hover:bg-lime-dark text-text-dark font-bold text-[12px] py-2.5 px-6 rounded-lg transition shadow-sm mb-3">
            <i className="ph ph-house text-sm"></i> На главную
          </a>
          <p className="text-[10px] text-white/20 mt-3">Или просто закройте вкладку и сделайте вид, что этого не было</p>
        </div>
      </div>
    </div>
  );
}
