import { useState, useRef } from 'react';

export function useStopwatch(initialSeconds: number = 0) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    timerRef.current = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
  };

  const stop = () => {
    if (!isRunning) return;
    setIsRunning(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const reset = () => {
    stop();
    setSeconds(0);
  };

  const formatted = new Date(seconds * 1000).toISOString().slice(11, 19);

  return { seconds, formatted, isRunning, start, stop, reset };
}
