"use client";

import { useState, useEffect } from "react";

type UndoToastProps = {
  message: string;
  onUndo: () => void;
  onExpire: () => void;
  durationMs?: number;
};

export default function UndoToast({ message, onUndo, onExpire, durationMs = 5000 }: UndoToastProps) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setProgress(remaining);
      if (remaining <= 0) {
        clearInterval(interval);
        onExpire();
      }
    }, 50);
    return () => clearInterval(interval);
  }, [durationMs, onExpire]);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-text-dark text-white rounded-xl px-5 py-3 flex items-center gap-4 shadow-2xl min-w-[300px]">
        <span className="text-[12px] flex-1">{message}</span>
        <button onClick={onUndo} className="text-lime-card text-[12px] font-bold hover:text-white transition">
          Отменить
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 rounded-b-xl overflow-hidden">
          <div className="h-full bg-lime-card transition-all ease-linear" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
}
