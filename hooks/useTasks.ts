import { useState, useEffect, useCallback } from 'react';
import { useUser } from '../lib/auth';
import { getTasks, createTask, updateTask, deleteTask, Task } from '../lib/tasks';

export function useTasks(startDate?: string, endDate?: string) {
  const { user } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadTasks = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    
    // Если даты не переданы (как в DayList или MonthGrid по умолчанию), 
    // берем диапазон: от начала текущего года до конца следующего.
    // Это оптимально для MVP (покроет все нужды) и не нагрузит БД запросами за 10 лет.
    const now = new Date();
    const sDate = startDate || `${now.getFullYear()}-01-01`;
    const eDate = endDate || `${now.getFullYear() + 1}-12-31`;
    
    const data = await getTasks(user.id, sDate, eDate);
    
    setTasks(data);
    setIsLoading(false);
  }, [user, startDate, endDate]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const addTask = async (text: string, date: string, projectId: string | null = null, isFocus: boolean = false) => {
    if (!user) return null;
    const newTask = await createTask(user.id, text, date, projectId, isFocus);
    if (newTask) setTasks(prev => [...prev, newTask]);
    return newTask;
  };

  const toggleTask = async (id: string, currentStatus: boolean) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !currentStatus } : t));
    await updateTask(id, { done: !currentStatus });
  };

  const editTask = async (id: string, text: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, text } : t));
    await updateTask(id, { text });
  };

  const removeTask = async (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isDeleting: true } : t)); // optimistic UI
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, isLoading, addTask, toggleTask, editTask, removeTask, refresh: loadTasks };
}
