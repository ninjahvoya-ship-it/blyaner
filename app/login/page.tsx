"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message === 'Invalid login credentials' ? 'Неверный email или пароль' : error.message);
    else router.push('/week');
    setLoading(false);
  };

  const handleRegister = async () => {
    if (password !== password2) { setError('Пароли не совпадают'); return; }
    if (password.length < 6) { setError('Пароль минимум 6 символов'); return; }
    setLoading(true);
    setError('');
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else { setSuccess('Проверь почту для подтверждения!'); setTab('login'); }
    setLoading(false);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: window.location.origin + '/week' } });
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

        {/* Fixed-height form container to prevent jumping */}
        <div className="bg-white/10 rounded-xl p-5 mb-4" style={{ minHeight: '320px' }}>
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5 mb-5">
            <button onClick={() => { setTab('login'); setError(''); }} className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition ${tab === 'login' ? 'bg-lime-card text-text-dark' : 'text-white/40'}`}>Вход</button>
            <button onClick={() => { setTab('register'); setError(''); }} className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition ${tab === 'register' ? 'bg-lime-card text-text-dark' : 'text-white/40'}`}>Регистрация</button>
          </div>

          {error && <p className="text-red-300 text-[11px] mb-3 text-center bg-red-400/10 rounded-lg py-2">{error}</p>}
          {success && <p className="text-lime-card text-[11px] mb-3 text-center bg-lime-card/10 rounded-lg py-2">{success}</p>}

          <div className="mb-3">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
            <div className="relative">
              <i className="ph ph-envelope absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
              <input type="email" name="email" autoComplete="email" placeholder="anna@example.com" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
            </div>
          </div>

          <div className="mb-3">
            <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Пароль</label>
            <div className="relative">
              <i className="ph ph-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
              <input type="password" name="password" autoComplete={tab === 'login' ? 'current-password' : 'new-password'} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && tab === 'login' && handleLogin()}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
            </div>
          </div>

          {tab === 'register' && (
            <div className="mb-3">
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Пароль ещё раз</label>
              <div className="relative">
                <i className="ph ph-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                <input type="password" name="password2" autoComplete="new-password" placeholder="Повторите пароль" value={password2} onChange={e => setPassword2(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
              </div>
            </div>
          )}

          <div className="mt-5">
            <button onClick={tab === 'login' ? handleLogin : handleRegister} disabled={loading}
              className="w-full bg-lime-card hover:bg-lime-dark text-text-dark font-bold text-[12px] py-2.5 rounded-lg transition shadow-sm disabled:opacity-50">
              {loading ? 'Загрузка...' : tab === 'login' ? 'Войти' : 'Создать аккаунт'}
            </button>
          </div>

          {tab === 'login' && <p className="text-center text-[10px] text-white/25 mt-3"><a href="#" className="text-white/40 hover:text-white/60 transition">Забыли пароль?</a></p>}
        </div>

        {/* Social */}
        <div className="bg-white/10 rounded-xl p-5">
          <p className="text-[10px] text-white/30 text-center mb-3 font-medium">или войдите через</p>
          <div className="flex gap-2">
            <button onClick={handleGoogle} className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium py-2.5 rounded-lg transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium py-2.5 rounded-lg transition opacity-50 cursor-not-allowed" title="Скоро">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" fill="#2AABEE"/><path d="M17.4 8.2l-1.6 7.5c-.1.6-.5.7-.9.5l-2.6-1.9-1.3 1.2c-.1.1-.3.2-.5.2l.2-2.7 5-4.5c.2-.2-.05-.3-.3-.1L9 13.1l-2.5-.8c-.6-.2-.6-.6.1-.8l9.8-3.8c.5-.2.9.1.7.8v-.3z" fill="white"/></svg>
              Telegram
            </button>
          </div>
        </div>

        <p className="text-center text-[9px] text-white/15 mt-4">Нажимая «Войти», вы соглашаетесь с <a href="#" className="underline text-white/25">условиями</a> и <a href="#" className="underline text-white/25">политикой</a></p>
      </div>
    </div>
  );
}
