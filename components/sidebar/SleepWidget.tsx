"use client";
import { useState } from 'react';

export default function SleepWidget() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="bg-white/10 rounded-xl p-3 mb-4 relative">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[10px] font-bold text-white/50 uppercase tracking-wider">Сон</h3>
        
        <div 
          className="relative group" 
        >
          <div className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition">
            <i className="ph ph-question text-[9px] text-white/40"></i>
          </div>
          <div className="hidden group-hover:block absolute right-0 top-6 w-48 bg-white rounded-xl p-3 shadow-xl z-50">
            <p className="text-[10px] text-[#2D2B3D] leading-relaxed">
              Нажми <b>Сплю</b> перед сном и <b>Встала</b> утром. Блянер посчитает сколько ты спала и покажет статистику по дням.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between gap-1 h-[36px] mb-2">
        {/* Бары с тултипами (наведение на бар) */}
        {[70, 50, 25, 80, 55, 0, 0].map((h, i) => (
          <div key={i} className="flex-1 bg-white/5 rounded-t h-full relative group">
            <div 
              className={`w-full rounded-t transition-all cursor-pointer hover:opacity-80 ${h > 0 && h < 30 ? 'bg-[#FCA5A5]/60' : 'bg-[#D4E84D]/60'}`} 
              style={{ height: `${h}%` }}
            />
            {/* Тултип бара */}
            {h > 0 && (
              <div className="absolute bottom-[110%] left-1/2 -translate-x-1/2 hidden group-hover:block z-50 bg-white rounded-lg p-1.5 shadow-lg pointer-events-none min-w-max">
                <p className="text-[9px] font-bold text-[#FCA5A5] text-center mb-0.5">Пн: 6.2ч</p>
                <p className="text-[8px] text-[#8E8BA0] text-center">04:30 - 10:42</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <p className="text-[9px] text-white/30 mb-2">Нет данных</p>
      
      <div className="flex gap-1.5">
        <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-white/20 transition">
          <i className="ph ph-moon text-[11px]"></i> Сплю
        </button>
        <button className="flex-1 bg-white/15 text-[9px] font-bold py-1.5 rounded-lg flex items-center justify-center gap-1 hover:bg-white/20 transition">
          <i className="ph ph-sun text-[11px]"></i> Встала
        </button>
      </div>
    </div>
  );
}
