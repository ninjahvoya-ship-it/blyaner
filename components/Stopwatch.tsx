"use client";

import { useState, useEffect, useRef, useCallback } from "react";

type StopwatchProps = {
  taskId?: string;
  taskName?: string;
  initialSeconds?: number;
  onSave?: (taskId: string, seconds: number) => void;
  compact?: boolean;
};

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function parseTimeSpent(str: string | null): number {
  if (!str) return 0;
  const hMatch = str.match(/(\d+)\s*ч/);
  const mMatch = str.match(/(\d+)\s*м/);
  return (hMatch ? parseInt(hMatch[1]) * 3600 : 0) + (mMatch ? parseInt(mMatch[1]) * 60 : 0);
}

function formatTimeSpent(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0 && m > 0) return `${h}ч ${m}м`;
  if (h > 0) return `${h}ч`;
  if (m > 0) return `${m}м`;
  return '< 1м';
}

export { parseTimeSpent, formatTimeSpent };

export default function Stopwatch({ taskId, taskName, initialSeconds = 0, onSave, compact = false }: StopwatchProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setSeconds(s => s + 1), 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  const handleToggle = useCallback(() => {
    if (running && taskId && onSave) {
      onSave(taskId, seconds);
    }
    setRunning(r => !r);
  }, [running, taskId, seconds, onSave]);

  if (compact) {
    return (
      <button onClick={handleToggle}
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition ${running ? 'bg-red-100 hover:bg-red-200' : 'bg-main-bg hover:bg-grid-line'}`}>
        <i className={`ph ${running ? 'ph-pause' : 'ph-play'} text-xs ${running ? 'text-red-500' : 'text-sidebar'}`}></i>
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {taskName && <span className="text-[11px] text-text-muted truncate max-w-[120px]">{taskName}</span>}
      <div className={`font-mono text-sm font-bold tabular-nums ${running ? 'text-red-500' : 'text-text-dark'}`}>
        {formatTime(seconds)}
      </div>
      <button onClick={handleToggle}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition ${running ? 'bg-red-100 hover:bg-red-200' : 'bg-lime-card/30 hover:bg-lime-card/50'}`}>
        <i className={`ph-bold ${running ? 'ph-pause' : 'ph-play'} text-xs ${running ? 'text-red-500' : 'text-lime-dark'}`}></i>
      </button>
      {!running && seconds > 0 && (
        <button onClick={() => { setSeconds(0); }}
          className="text-[10px] text-text-muted hover:text-red-400 transition">
          <i className="ph ph-arrow-counter-clockwise text-xs"></i>
        </button>
      )}
    </div>
  );
}
