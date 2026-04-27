"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MoonStars, Sun, Play, Timer, PaintBrush, FolderOpen, Bed, Clock, X, Trash, SlidersHorizontal, Asterisk, ArrowRight, ArrowUp, CheckCircle, AppleLogo, AndroidLogo, Desktop } from "@phosphor-icons/react";

export default function LandingPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`min-h-screen font-sans selection:bg-[#D4E84D] selection:text-[#8B7EC8] ${isDarkTheme ? 'bg-[#3B2D71]' : 'bg-white'}`}>
      
      {/* Навигация */}
      <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
          <div className="bg-white/80 backdrop-blur-xl border border-gray-100 rounded-full px-6 py-3 flex justify-between items-center w-full max-w-5xl shadow-sm">
              <div className="text-xl font-black text-[#2D2B3D] tracking-tight flex items-center gap-2">
                  <Asterisk weight="fill" className="text-[#8B7EC8]" /> Блянер
              </div>
              <Link href="/week" className="bg-[#D4E84D] text-[#2D2B3D] px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-sm">
                  Войти
              </Link>
          </div>
      </nav>

      {/* Hero Секция */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="pr-4 mt-10 lg:mt-0">
              <div className="inline-flex items-center gap-2 text-[#8B7EC8] font-black text-sm uppercase tracking-widest mb-6">
                  Блянер <ArrowRight weight="bold" />
              </div>
              <h1 className="text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-8 text-[#2D2B3D]">
                  Потому что <br/><span className="text-[#8B7EC8]">бля, опять ничего не сделала.</span>
              </h1>
              <p className="text-lg text-gray-500 leading-relaxed mb-10 font-medium max-w-md">
                  Курса «как стать лучшей версией себя» в комплекте нет. Просто планер, чтобы не забыть, что нужно сделать, и трекер сна, чтобы наконец понять, почему на это нет сил.
              </p>
              <Link href="/week" className="inline-block bg-[#8B7EC8] text-white px-10 py-4 rounded-full text-lg font-bold shadow-lg hover:bg-[#6A5AAB] transition-all hover:-translate-y-1">
                  Попробовать
              </Link>
          </div>

          <div className="rounded-[40px] bg-[#F2EFFF] relative h-[500px] flex justify-center items-center overflow-hidden hidden md:flex">
              <div className="absolute top-10 left-10 bg-white px-4 py-2 rounded-full shadow-lg font-bold text-sm text-[#8B7EC8] animate-[float_6s_ease-in-out_infinite] flex items-center gap-2 z-20">
                  <MoonStars weight="fill" /> Сон 6.2ч
              </div>
              <div className="absolute bottom-20 right-5 bg-[#D4E84D] px-4 py-2 rounded-full shadow-lg font-bold text-sm text-[#2D2B3D] animate-[float_7s_ease-in-out_infinite_1s] flex items-center gap-2 z-20">
                  <Timer weight="fill" /> 01:45:12
              </div>
              <div className="absolute top-1/2 -right-6 bg-[#2D2B3D] px-4 py-2 rounded-full shadow-lg font-bold text-sm text-white animate-[float_5s_ease-in-out_infinite_0.5s] flex items-center gap-2 z-20">
                  Дедлайн: Завтра
              </div>

              <div className="bg-white p-5 rounded-[32px] shadow-2xl w-64 relative z-10 animate-[float_6s_ease-in-out_infinite] border border-white">
                  <div className="flex items-center gap-2 mb-4">
                      <span className="w-8 h-8 rounded-full bg-[#8B7EC8] flex justify-center items-center font-bold text-white text-xs">1</span>
                      <h2 className="font-bold text-gray-800">Вторник</h2>
                  </div>
                  <div className="space-y-3">
                      <div className="p-3 rounded-2xl bg-[#F2EFFF] border border-[#8B7EC8]/10 flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#8B7EC8] mt-1.5"></div>
                          <div><p className="text-sm font-bold text-gray-800">Собрать макеты</p><p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Фриланс</p></div>
                      </div>
                      <div className="p-3 rounded-2xl bg-[#FCE7F3] border border-pink-200 flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-pink-400 mt-1.5"></div>
                          <div><p className="text-sm font-bold text-gray-800">Запустить таймер</p><p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Book Tracker</p></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Манифест */}
      <section className="px-6 py-10 max-w-7xl mx-auto">
          <div className="rounded-[40px] bg-[#D4E84D] relative overflow-hidden flex flex-col items-center justify-center text-center py-20">
              <div className="absolute inset-0 opacity-50 top-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20, 50 10 T 100 10' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat-x", backgroundSize: "100px 20px" }}></div>
              <div className="absolute inset-0 opacity-50 bottom-10" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q 25 20, 50 10 T 100 10' fill='none' stroke='rgba(255,255,255,0.4)' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat-x", backgroundSize: "100px 20px", backgroundPosition: "50px 0" }}></div>
              
              <h2 className="text-4xl md:text-5xl font-black text-[#2D2B3D] mb-12 relative z-10">
                  «Я думала, это будет быстро.<br/>Спойлер: <span className="relative inline-block after:content-[''] after:absolute after:-left-[5%] after:top-[55%] after:w-[110%] after:h-[6px] after:bg-[#D4E84D] after:-rotate-2 after:rounded-full text-gray-500">нихуя</span>.»
              </h2>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative z-10 px-4">
                  <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-[#2D2B3D] rounded-full text-[#D4E84D] flex items-center justify-center mb-4 text-2xl"><X weight="fill" /></div>
                      <h3 className="font-bold text-xl mb-2 text-[#2D2B3D]">Никаких оплат</h3>
                      <p className="font-medium text-[#2D2B3D]/70">Бесплатно, потому что делала для себя.</p>
                  </div>
                  <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-[#2D2B3D] rounded-full text-[#D4E84D] flex items-center justify-center mb-4 text-2xl"><Trash weight="fill" /></div>
                      <h3 className="font-bold text-xl mb-2 text-[#2D2B3D]">Без перегруза</h3>
                      <p className="font-medium text-[#2D2B3D]/70">В Miro с телефона не зайдёшь. Тут — два тапа.</p>
                  </div>
                  <div className="text-center">
                      <div className="w-12 h-12 mx-auto bg-[#2D2B3D] rounded-full text-[#D4E84D] flex items-center justify-center mb-4 text-2xl"><SlidersHorizontal weight="fill" /></div>
                      <h3 className="font-bold text-xl mb-2 text-[#2D2B3D]">Идеально под загоны</h3>
                      <p className="font-medium text-[#2D2B3D]/70">Бесит фича? Зайди в настройки и выключи.</p>
                  </div>
              </div>
          </div>
      </section>

      {/* Фичи */}
      <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-black mb-12 text-center text-[#2D2B3D]">Что внутри?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {/* Чувство времени */}
                  <div className="bg-[#F2EFFF] rounded-[40px] p-8 relative overflow-hidden flex flex-col shadow-sm hover:-translate-y-1 transition-transform">
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#8B7EC8] flex items-center justify-center text-[#8B7EC8] rotate-45"><ArrowUp weight="bold" /></div>
                      <div className="w-12 h-12 bg-white rounded-2xl flex justify-center items-center mb-6 shadow-sm"><Clock weight="fill" className="text-2xl text-[#8B7EC8]" /></div>
                      
                      <h3 className="text-2xl font-black mb-4 text-[#2D2B3D]">Чувство времени</h3>
                      <p className="font-medium text-gray-600 mb-8 text-[15px] leading-relaxed">Встроенный таймер фокуса. Никаких левых приложений. Нажала Play прямо на задаче — время пошло. Смотришь в статистику и наконец-то учишься оценивать свои времязатраты реалистично.</p>
                      
                      <div className="mt-auto bg-white p-4 rounded-[24px] shadow-[0_8px_20px_rgba(212,232,77,0.15)] border-2 border-[#D4E84D] flex items-center justify-between relative overflow-hidden">
                          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-16 h-16 bg-[#D4E84D] opacity-30 rounded-full blur-xl"></div>
                          <div className="flex items-center gap-4 relative z-10">
                              <div className="w-12 h-12 bg-[#D4E84D] rounded-full flex justify-center items-center shadow-sm">
                                  <Play weight="fill" className="text-[#8B7EC8] text-xl" />
                              </div>
                              <div>
                                  <h4 className="font-black text-[22px] text-[#2D2B3D] tracking-tight leading-none mb-1">01:45:12</h4>
                                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">BOOK TRACKER</p>
                              </div>
                          </div>
                          <Timer className="text-4xl text-gray-100 relative z-10" />
                      </div>
                  </div>

                  {/* Крупные дистанции */}
                  <div className="bg-[#D4E84D] rounded-[40px] p-8 relative overflow-hidden flex flex-col shadow-sm hover:-translate-y-1 transition-transform md:mt-8">
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-[#2D2B3D] flex items-center justify-center text-[#2D2B3D] rotate-45"><ArrowUp weight="bold" /></div>
                      <div className="w-12 h-12 bg-[#2D2B3D] rounded-2xl flex justify-center items-center mb-6 shadow-sm"><PaintBrush weight="fill" className="text-2xl text-[#D4E84D]" /></div>
                      
                      <h3 className="text-2xl font-black mb-4 text-[#2D2B3D]">Крупные дистанции</h3>
                      <p className="font-medium text-[#2D2B3D]/80 mb-8 text-[15px] leading-relaxed">Цветовое кодирование и дедлайны. В Блянере сразу видно, какая задача какому проекту отдана, перед кем горит ответственность и каким проектом была занята неделя больше всего.</p>
                      
                      <div className="mt-auto space-y-3">
                          <div className="bg-white p-4 rounded-2xl border border-[#B8ADE8]/30 flex items-center gap-3 shadow-[0_4px_10px_rgba(139,126,200,0.05)]">
                              <div className="w-2 h-2 rounded-full bg-[#B8ADE8]"></div>
                              <div>
                                  <p className="text-sm font-bold text-[#2D2B3D] leading-tight">Дизайн-система</p>
                                  <p className="text-[11px] text-gray-500 mt-0.5">Book Tracker</p>
                              </div>
                          </div>
                          <div className="bg-white p-4 rounded-2xl border border-pink-200/50 flex items-center gap-3 shadow-[0_4px_10px_rgba(249,168,212,0.05)]">
                              <div className="w-2 h-2 rounded-full bg-[#F9A8D4]"></div>
                              <div>
                                  <p className="text-sm font-bold text-[#2D2B3D] leading-tight">Пост в канал</p>
                                  <p className="text-[11px] text-gray-500 mt-0.5">Jellyfish Lab</p>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Ресурс */}
                  <div className="bg-gradient-to-br from-[#8B7EC8] to-[#6A5AAB] rounded-[40px] p-8 relative overflow-hidden flex flex-col shadow-sm hover:-translate-y-1 transition-transform">
                      <div className="absolute top-6 right-6 w-8 h-8 rounded-full border border-white/50 flex items-center justify-center text-white rotate-45"><ArrowUp weight="bold" /></div>
                      <div className="w-12 h-12 bg-white/20 rounded-2xl flex justify-center items-center mb-6 shadow-sm backdrop-blur-sm"><MoonStars weight="fill" className="text-2xl text-white" /></div>
                      
                      <h3 className="text-2xl font-black mb-4 text-white">Ресурс</h3>
                      <p className="font-medium text-white/90 mb-8 text-[15px] leading-relaxed">Две кнопки в телефоне. Никаких умных браслетов. Планер сам считает часы, строит график и показывает связь между твоим режимом и тем, сколько ты реально вывозишь за день.</p>
                      
                      <div className="mt-auto flex gap-2">
                          <div className="flex-1 bg-[#D4E84D] text-[#2D2B3D] font-bold text-sm py-4 rounded-2xl flex justify-center items-center gap-2 shadow-sm"><Bed weight="fill" className="text-lg" /> Сплю</div>
                          <div className="flex-1 bg-white/10 border border-white/20 text-white font-bold text-sm py-4 rounded-2xl flex justify-center items-center gap-2 backdrop-blur-md"><Sun weight="fill" className="text-lg" /> Встала</div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Выключатели */}
      <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto bg-[#F4F3F8] rounded-[40px] p-10 grid md:grid-cols-2 gap-10 items-center border border-gray-100">
              <div className="lg:pr-10">
                  <h2 className="text-4xl lg:text-5xl font-black mb-6 text-[#2D2B3D] leading-tight">Слишком много всего? <br/><span className="text-[#8B7EC8]">Вырубай.</span></h2>
                  <p className="font-medium text-gray-500 text-lg leading-relaxed">Я делала Блянер под себя, и он не обязан быть универсальным. Бесит трекер сна? Зайди в настройки и выключи его нахрен. Оставь только то, что работает для тебя.</p>
              </div>
              <div className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 space-y-4">
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                      <div className="flex items-center gap-3"><Clock weight="fill" className="text-[#8B7EC8] text-xl" /><span className="font-bold text-gray-800">Секундомер</span></div>
                      <div className="w-12 h-7 bg-[#D4E84D] rounded-full relative shadow-inner"><div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div></div>
                  </div>
                  <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100 opacity-50 grayscale">
                      <div className="flex items-center gap-3"><MoonStars weight="fill" className="text-gray-500 text-xl" /><span className="font-bold text-gray-500">Сон</span></div>
                      <div className="w-12 h-7 bg-gray-200 rounded-full relative shadow-inner"><div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm"></div></div>
                  </div>
              </div>
          </div>
      </section>

      {/* PWA Section - Восстановлена! */}
      <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-[#8B7EC8] to-[#6A5AAB] rounded-[40px] p-10 lg:p-16 grid md:grid-cols-2 gap-12 items-center relative overflow-hidden shadow-lg border border-white/10 hover:shadow-2xl transition-shadow duration-500">
              
              <div className="absolute top-0 left-0 w-96 h-96 bg-white opacity-10 rounded-full blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2D2B3D] opacity-20 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="relative z-10 flex justify-center">
                  <div className="w-full max-w-sm bg-white/10 backdrop-blur-xl rounded-[32px] p-8 border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:-translate-y-2 transition-transform duration-500">
                      <div className="flex justify-between items-center mb-6">
                          <span className="text-white font-bold text-lg tracking-wide">Темная тема</span>
                          <div className="w-12 h-7 bg-[#D4E84D] rounded-full relative shadow-inner">
                              <div className="absolute right-1 top-1 w-5 h-5 bg-[#2D2B3D] rounded-full shadow-sm flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-[#D4E84D] rounded-full"></div>
                              </div>
                          </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-[24px] p-5 border border-white/10">
                          <div className="flex items-center gap-3 mb-4">
                              <span className="w-8 h-8 rounded-full bg-white/20 flex justify-center items-center font-bold text-white text-xs">1</span>
                              <h2 className="font-bold text-white">Вторник</h2>
                          </div>
                          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3">
                              <div className="w-2 h-2 rounded-full bg-pink-400 mt-1.5 shadow-[0_0_8px_#F9A8D4]"></div>
                              <p className="text-sm font-semibold text-white/90">Пост в канал</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="relative z-10 lg:pl-8">
                  <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white leading-tight">
                      Ноут + Телефон. <br/><span className="text-[#D4E84D]">Без костылей.</span>
                  </h2>
                  <p className="font-medium text-white/80 text-[17px] leading-relaxed mb-8 max-w-md">
                      Нажимать кнопку «Сплю» удобнее с телефона в кровати. А раскидывать задачи по неделе — с большого экрана ноута. Работает бесшовно и ставится на экран айфона в два тапа как нативное приложение (PWA).
                  </p>
                  <div className="flex items-center gap-4 text-sm font-bold text-white/70">
                      <div className="flex items-center gap-1.5"><AppleLogo weight="bold" className="text-xl" /> iOS</div>
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                      <div className="flex items-center gap-1.5"><AndroidLogo weight="bold" className="text-xl" /> Android</div>
                      <div className="w-1.5 h-1.5 bg-white/30 rounded-full"></div>
                      <div className="flex items-center gap-1.5"><Desktop weight="bold" className="text-xl" /> Web</div>
                  </div>
              </div>
          </div>
      </section>

      {/* Интерактивная Темная тема */}
      <section className="py-20 px-6">
          <div className={`max-w-7xl mx-auto rounded-[40px] transition-colors duration-700 py-24 px-8 text-center relative overflow-hidden group ${isDarkTheme ? 'bg-transparent border-transparent' : 'bg-gray-100 border border-gray-100'}`}>
              
              <div className={`absolute inset-0 bg-gradient-to-br from-[#8B7EC8] to-[#6A5AAB] transition-opacity duration-700 pointer-events-none ${isDarkTheme ? 'opacity-100' : 'opacity-0'}`}></div>

              <div className="relative z-10 mb-12">
                  <h2 className={`text-4xl lg:text-5xl font-black mb-4 transition-colors ${isDarkTheme ? 'text-white' : 'text-[#2D2B3D]'}`}>Темная тема. Как надо.</h2>
                  <p className={`text-xl font-medium transition-colors ${isDarkTheme ? 'text-white/80' : 'text-gray-500'}`}>Глубокий фиолетовый. Стекло. Кликни на переключатель.</p>
              </div>

              <button onClick={toggleTheme} className={`relative z-10 w-24 h-12 rounded-full p-1 shadow-inner transition-all duration-500 flex items-center mb-16 mx-auto cursor-pointer focus:outline-none ${isDarkTheme ? 'bg-white/20 border-white/20' : 'bg-white border-gray-200'} border`}>
                  <div className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all duration-500 transform ${isDarkTheme ? 'translate-x-12 bg-[#D4E84D]' : 'translate-x-0 bg-[#8B7EC8]'}`}>
                      {isDarkTheme ? <MoonStars weight="fill" className="text-[#2D2B3D] text-lg" /> : <Sun weight="fill" className="text-white text-lg" />}
                  </div>
              </button>

              <div className={`relative z-10 p-8 rounded-[32px] max-w-sm mx-auto transition-all duration-700 border text-left ${isDarkTheme ? 'bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl' : 'bg-white border-gray-100 shadow-xl'}`}>
                  <div className="flex items-center gap-3 mb-6">
                      <span className={`w-10 h-10 rounded-full flex justify-center items-center font-bold transition-colors ${isDarkTheme ? 'bg-[#D4E84D] text-[#2D2B3D]' : 'bg-[#8B7EC8] text-white'}`}>4</span>
                      <h2 className={`text-2xl font-bold transition-colors ${isDarkTheme ? 'text-white' : 'text-[#2D2B3D]'}`}>Четверг</h2>
                  </div>
                  <div className={`p-4 rounded-2xl flex items-center justify-between transition-colors duration-700 relative overflow-hidden border ${isDarkTheme ? 'bg-white/5 border-white/10' : 'bg-[#8B7EC8]/5 border-[#8B7EC8]/10'}`}>
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 bg-[#D4E84D] transition-opacity duration-700 ${isDarkTheme ? 'opacity-100' : 'opacity-0'}`}></div>
                      <div className="flex items-center gap-3 pl-2">
                          <div className="w-6 h-6 rounded-full border-2 border-[#8B7EC8] flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-[#8B7EC8]"></div></div>
                          <div><p className={`font-bold text-sm transition-colors ${isDarkTheme ? 'text-white' : 'text-gray-800'}`}>Кайфануть от дизайна</p><p className={`text-[10px] font-bold uppercase mt-0.5 transition-colors ${isDarkTheme ? 'text-white/60' : 'text-gray-400'}`}>Блянер</p></div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Подвал */}
      <section className="py-10 px-6 max-w-7xl mx-auto mb-20">
          <div className="bg-[#F2EFFF] rounded-[40px] p-10 overflow-hidden grid md:grid-cols-2 gap-10 items-center border border-[#8B7EC8]/10 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative z-10 lg:pl-10">
                  <h2 className="text-5xl font-black mb-6 text-[#2D2B3D] leading-tight">Твоя новая неделя <br/>начинается здесь.</h2>
                  <div className="flex items-center gap-4 mt-10">
                      <Link href="/week" className="bg-[#8B7EC8] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg hover:scale-105 transition-transform">
                          Войти в Блянер
                      </Link>
                      <span className="text-sm font-bold text-[#8B7EC8] bg-[#8B7EC8]/10 px-4 py-2 rounded-full">Бесплатно</span>
                  </div>
              </div>
              
              <div className="relative h-full min-h-[300px] bg-[#D4E84D] rounded-[32px] overflow-hidden flex items-center justify-center">
                  <Asterisk weight="fill" className="text-[200px] text-[#2D2B3D] opacity-10 absolute -right-10 -bottom-10" />
                  <div className="bg-white p-6 rounded-3xl shadow-xl rotate-12 animate-[float_6s_ease-in-out_infinite]">
                      <CheckCircle weight="fill" className="text-6xl text-[#8B7EC8]" />
                  </div>
              </div>
          </div>
      </section>

    </div>
  );
}
