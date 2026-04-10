import { useState } from 'react';
import { createSubtask, updateSubtask, deleteSubtask, Subtask } from '../lib/tasks';

export function useSubtasks(initialSubtasks: Subtask[] = []) {
  const [subtasks, setSubtasks] = useState<Subtask[]>(initialSubtasks || []);

  const addSubtask = async (taskId: string, text: string) => {
    const newSub = await createSubtask(taskId, text);
    if (newSub) setSubtasks(prev => [...prev, newSub]);
  };

  const toggleSubtask = async (id: string, done: boolean) => {
    setSubtasks(prev => prev.map(s => s.id === id ? { ...s, done } : s));
    await updateSubtask(id, { done });
  };

  const removeSubtask = async (id: string) => {
    setSubtasks(prev => prev.filter(s => s.id !== id));
    await deleteSubtask(id);
  };

  return { subtasks, addSubtask, toggleSubtask, removeSubtask };
}
