"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push('/week');
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else {
      setError('');
      setTab('login');
      alert('Проверь почту для подтверждения!');
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ background: "linear-gradient(160deg, #7A6DB8 0%, #8B7EC8 35%, #9D92D4 100%)" }}>
      <div className="w-full max-w-[380px] relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="ph-bold ph-calendar-check text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Блянер</h1>
          <p className="text-[13px] text-white/50">Бля, работает.</p>
        </div>

        <div className="bg-white/10 rounded-xl p-5 mb-4">
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5 mb-5">
            <button onClick={() => setTab('login')} className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition ${tab === 'login' ? 'bg-lime-card text-text-dark' : 'text-white/40'}`}>Вход</button>
            <button onClick={() => setTab('register')} className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition ${tab === 'register' ? 'bg-lime-card text-text-dark' : 'text-white/40'}`}>Регистрация</button>
          </div>

          {error && <p className="text-red-300 text-[11px] mb-3 text-center">{error}</p>}

          <div className="mb-3">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
            <div className="relative">
              <i className="ph ph-envelope absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
              <input type="email" placeholder="anna@example.com" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
            </div>
          </div>

          <div className="mb-5">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Пароль</label>
            <div className="relative">
              <i className="ph ph-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
              <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (tab === 'login' ? handleLogin() : handleRegister())}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
            </div>
          </div>

          <button onClick={tab === 'login' ? handleLogin : handleRegister} disabled={loading}
            className="w-full bg-lime-card hover:bg-lime-dark text-text-dark font-bold text-[12px] py-2.5 rounded-lg transition shadow-sm disabled:opacity-50">
            {loading ? 'Загрузка...' : tab === 'login' ? 'Войти' : 'Создать аккаунт'}
          </button>
        </div>

        <p className="text-center text-[9px] text-white/15 mt-4">Нажимая «Войти», вы соглашаетесь с <a href="#" className="underline text-white/25">условиями</a> и <a href="#" className="underline text-white/25">политикой</a></p>
      </div>
    </div>
  );
}
