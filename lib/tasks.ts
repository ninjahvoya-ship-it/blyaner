import { supabase } from "./supabase";

export type Task = {
  id: string;
  user_id: string;
  project_id: string | null;
  text: string;
  date: string;
  done: boolean;
  time_spent: string | null;
  deadline: string | null;
  sort_order: number;
  created_at: string;
  project?: { name: string; color: string } | null;
  subtasks?: Subtask[];
};

export type Subtask = {
  id: string;
  task_id: string;
  text: string;
  done: boolean;
  sort_order: number;
};

export type Project = {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at: string;
};

export type Goal = {
  id: string;
  user_id: string;
  text: string;
  type: 'week' | 'month';
  done: boolean;
  week_start: string | null;
  created_at: string;
};

export type SleepLog = {
  id: string;
  user_id: string;
  sleep_at: string;
  wake_at: string;
  date: string;
};

// ─── Tasks ───

export async function getTasks(userId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, project:projects(name, color), subtasks(id, task_id, text, done, sort_order)")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("sort_order");
  if (error) console.error("getTasks:", error);
  return (data as Task[]) || [];
}

export async function createTask(userId: string, text: string, date: string, projectId?: string) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ user_id: userId, text, date, project_id: projectId || null })
    .select()
    .single();
  if (error) console.error("createTask:", error);
  return data;
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  const clean: Record<string, unknown> = {};
  if (updates.done !== undefined) clean.done = updates.done;
  if (updates.text !== undefined) clean.text = updates.text;
  if (updates.date !== undefined) clean.date = updates.date;
  if (updates.time_spent !== undefined) clean.time_spent = updates.time_spent;
  if (updates.deadline !== undefined) clean.deadline = updates.deadline;
  if (updates.sort_order !== undefined) clean.sort_order = updates.sort_order;
  if (updates.project_id !== undefined) clean.project_id = updates.project_id;
  const { error } = await supabase.from("tasks").update(clean).eq("id", taskId);
  if (error) console.error("updateTask:", error);
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) console.error("deleteTask:", error);
}

// ─── Subtasks ───

export async function createSubtask(taskId: string, text: string) {
  const { data, error } = await supabase
    .from("subtasks")
    .insert({ task_id: taskId, text })
    .select()
    .single();
  if (error) console.error("createSubtask:", error);
  return data;
}

export async function updateSubtask(subtaskId: string, updates: { text?: string; done?: boolean }) {
  const { error } = await supabase.from("subtasks").update(updates).eq("id", subtaskId);
  if (error) console.error("updateSubtask:", error);
}

export async function deleteSubtask(subtaskId: string) {
  const { error } = await supabase.from("subtasks").delete().eq("id", subtaskId);
  if (error) console.error("deleteSubtask:", error);
}

// ─── Projects ───

export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");
  if (error) console.error("getProjects:", error);
  return (data as Project[]) || [];
}

export async function createProject(userId: string, name: string, color: string) {
  const { data, error } = await supabase
    .from("projects")
    .insert({ user_id: userId, name, color })
    .select()
    .single();
  if (error) console.error("createProject:", error);
  return data;
}

export async function deleteProject(projectId: string) {
  const { error } = await supabase.from("projects").delete().eq("id", projectId);
  if (error) console.error("deleteProject:", error);
}

// ─── Goals ───

export async function getGoals(userId: string, type: 'week' | 'month', weekStart?: string) {
  let q = supabase.from("goals").select("*").eq("user_id", userId).eq("type", type);
  if (weekStart) q = q.eq("week_start", weekStart);
  const { data, error } = await q.order("created_at");
  if (error) console.error("getGoals:", error);
  return (data as Goal[]) || [];
}

export async function createGoal(userId: string, text: string, type: 'week' | 'month', weekStart?: string) {
  const { data, error } = await supabase
    .from("goals")
    .insert({ user_id: userId, text, type, week_start: weekStart || null })
    .select()
    .single();
  if (error) console.error("createGoal:", error);
  return data;
}

export async function updateGoal(goalId: string, updates: { text?: string; done?: boolean }) {
  const { error } = await supabase.from("goals").update(updates).eq("id", goalId);
  if (error) console.error("updateGoal:", error);
}

export async function deleteGoal(goalId: string) {
  const { error } = await supabase.from("goals").delete().eq("id", goalId);
  if (error) console.error("deleteGoal:", error);
}

// ─── Sleep ───

export async function getSleepLogs(userId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from("sleep_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date");
  if (error) console.error("getSleepLogs:", error);
  return (data as SleepLog[]) || [];
}

export async function createSleepLog(userId: string, date: string, sleepAt: string, wakeAt: string) {
  const { data, error } = await supabase
    .from("sleep_logs")
    .insert({ user_id: userId, date, sleep_at: sleepAt, wake_at: wakeAt })
    .select()
    .single();
  if (error) console.error("createSleepLog:", error);
  return data;
}

export async function updateSleepLog(logId: string, updates: { sleep_at?: string; wake_at?: string }) {
  const { error } = await supabase.from("sleep_logs").update(updates).eq("id", logId);
  if (error) console.error("updateSleepLog:", error);
}

// ─── Profile ───

export async function getProfile(userId: string) {
  const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
  if (error) console.error("getProfile:", error);
  return data;
}

export async function updateProfile(userId: string, updates: Record<string, unknown>) {
  const { error } = await supabase.from("profiles").update(updates).eq("id", userId);
  if (error) console.error("updateProfile:", error);
}
