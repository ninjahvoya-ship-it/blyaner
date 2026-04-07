"use client";

import { useState } from "react";

export default function LoginPage() {
  const [tab, setTab] = useState<'login' | 'register'>('login');

  return (
    <div className="flex items-center justify-center p-4 min-h-screen" style={{ background: "linear-gradient(160deg, #7A6DB8 0%, #8B7EC8 35%, #9D92D4 100%)" }}>
      <div className="w-full max-w-[380px] relative">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
            <i className="ph-bold ph-calendar-check text-white text-2xl"></i>
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-1">Блянер</h1>
          <p className="text-[13px] text-white/50">Бля, работает.</p>
        </div>

        {/* Form */}
        <div className="bg-white/10 rounded-xl p-5 mb-4">
          {/* Tabs */}
          <div className="flex gap-1 bg-white/5 rounded-lg p-0.5 mb-5">
            <button onClick={() => setTab('login')} className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition ${tab === 'login' ? 'bg-lime-card text-text-dark' : 'text-white/40 hover:text-white/70'}`}>Вход</button>
            <button onClick={() => setTab('register')} className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition ${tab === 'register' ? 'bg-lime-card text-text-dark' : 'text-white/40 hover:text-white/70'}`}>Регистрация</button>
          </div>

          {tab === 'login' ? (
            <>
              <div className="mb-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
                <div className="relative">
                  <i className="ph ph-envelope absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                  <input type="email" placeholder="anna@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
                </div>
              </div>
              <div className="mb-5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Пароль</label>
                <div className="relative">
                  <i className="ph ph-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                  <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-10 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition"><i className="ph ph-eye text-sm"></i></button>
                </div>
              </div>
              <button className="w-full bg-lime-card hover:bg-lime-dark text-text-dark font-bold text-[12px] py-2.5 rounded-lg transition shadow-sm mb-3">Войти</button>
              <p className="text-center text-[10px] text-white/25"><a href="#" className="text-white/40 hover:text-white/60 transition">Забыли пароль?</a></p>
            </>
          ) : (
            <>
              <div className="mb-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Email</label>
                <div className="relative">
                  <i className="ph ph-envelope absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                  <input type="email" placeholder="anna@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Пароль</label>
                <div className="relative">
                  <i className="ph ph-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                  <input type="password" placeholder="Минимум 8 символов" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
                </div>
              </div>
              <div className="mb-5">
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5 block">Пароль ещё раз</label>
                <div className="relative">
                  <i className="ph ph-lock absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm"></i>
                  <input type="password" placeholder="Повторите пароль" className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2.5 text-[12px] text-white outline-none focus:border-lime-card/40 focus:bg-white/10 placeholder:text-white/15 transition" />
                </div>
              </div>
              <button className="w-full bg-lime-card hover:bg-lime-dark text-text-dark font-bold text-[12px] py-2.5 rounded-lg transition shadow-sm">Создать аккаунт</button>
            </>
          )}
        </div>

        {/* Social */}
        <div className="bg-white/10 rounded-xl p-5">
          <p className="text-[10px] text-white/30 text-center mb-3 font-medium">или войдите через</p>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium py-2.5 rounded-lg transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 text-white text-[11px] font-medium py-2.5 rounded-lg transition">
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
