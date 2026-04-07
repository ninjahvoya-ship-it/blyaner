"use client";

import { useState, useEffect } from "react";
import { useUser } from "../lib/auth";
import { getSleepLogs, createSleepLog, updateSleepLog, SleepLog } from "../lib/tasks";

export default function SleepWidget() {
  const { user } = useUser();
  const [log, setLog] = useState<SleepLog | null>(null);
  const [sleepTime, setSleepTime] = useState('');
  const [wakeTime, setWakeTime] = useState('');
  const [editing, setEditing] = useState(false);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!user) return;
    loadLog();
  }, [user]);

  const loadLog = async () => {
    if (!user) return;
    const logs = await getSleepLogs(user.id, today, today);
    if (logs.length > 0) {
      setLog(logs[0]);
      setSleepTime(logs[0].sleep_at ? logs[0].sleep_at.slice(11, 16) : '');
      setWakeTime(logs[0].wake_at ? logs[0].wake_at.slice(11, 16) : '');
    }
  };

  const handleSave = async () => {
    if (!user || !sleepTime || !wakeTime) return;
    const sleepAt = `${today}T${sleepTime}:00`;
    const wakeAt = `${today}T${wakeTime}:00`;

    if (log) {
      await updateSleepLog(log.id, { sleep_at: sleepAt, wake_at: wakeAt });
      setLog({ ...log, sleep_at: sleepAt, wake_at: wakeAt });
    } else {
      const newLog = await createSleepLog(user.id, today, sleepAt, wakeAt);
      if (newLog) setLog(newLog);
    }
    setEditing(false);
  };

  const calcHours = () => {
    if (!log?.sleep_at || !log?.wake_at) return null;
    const s = new Date(log.sleep_at);
    const w = new Date(log.wake_at);
    let diff = (w.getTime() - s.getTime()) / 3600000;
    if (diff < 0) diff += 24;
    return diff.toFixed(1);
  };

  const hours = calcHours();

  return (
    <div className="px-5 py-3">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
          <i className="ph ph-moon text-xs"></i> Сон
        </h3>
        <button onClick={() => setEditing(!editing)} className="text-white/30 hover:text-white/60 transition">
          <i className={`ph ${editing ? 'ph-x' : 'ph-pencil-simple'} text-xs`}></i>
        </button>
      </div>

      {editing ? (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <i className="ph ph-moon text-[10px] text-white/30"></i>
            <input type="time" value={sleepTime} onChange={e => setSleepTime(e.target.value)}
              className="text-[11px] text-white bg-white/5 rounded-lg px-2 py-1.5 outline-none border border-white/10 flex-1" />
          </div>
          <div className="flex items-center gap-2">
            <i className="ph ph-sun text-[10px] text-white/30"></i>
            <input type="time" value={wakeTime} onChange={e => setWakeTime(e.target.value)}
              className="text-[11px] text-white bg-white/5 rounded-lg px-2 py-1.5 outline-none border border-white/10 flex-1" />
          </div>
          <button onClick={handleSave}
            className="w-full bg-lime-card text-text-dark text-[10px] font-bold py-1.5 rounded-md hover:bg-lime-dark transition">
            Сохранить
          </button>
        </div>
      ) : hours ? (
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <p className="text-lg font-extrabold text-white">{hours}<span className="text-[10px] text-white/40 font-medium ml-1">ч</span></p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-white/40">{sleepTime} <i className="ph ph-arrow-right text-[8px]"></i> {wakeTime}</p>
          </div>
        </div>
      ) : (
        <button onClick={() => setEditing(true)} className="text-[10px] text-white/30 hover:text-white/50 transition">
          + Записать сон
        </button>
      )}
    </div>
  );
}
