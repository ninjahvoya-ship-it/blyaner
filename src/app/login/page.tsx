export default function LoginPage() {
  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ background: "linear-gradient(160deg, #7A6DB8 0%, #8B7EC8 35%, #9D92D4 100%)" }}>
      <div className="w-full max-w-[380px] relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-white mb-1">Блянер</h1>
          <p className="text-[13px] text-white/50">Бля, работает.</p>
        </div>
        <div className="bg-white/10 rounded-xl p-5 mb-4">
          <p className="text-white/40 text-center text-sm">Страница входа (в разработке)</p>
        </div>
      </div>
    </div>
  );
}
