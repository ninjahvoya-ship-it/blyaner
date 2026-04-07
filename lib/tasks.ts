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
};

export async function getTasks(userId: string, startDate: string, endDate: string) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, project:projects(name, color)")
    .eq("user_id", userId)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("sort_order");
  
  if (error) console.error("getTasks error:", error);
  return data as Task[] || [];
}

export async function createTask(userId: string, text: string, date: string) {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ user_id: userId, text, date })
    .select()
    .single();
  
  if (error) console.error("createTask error:", error);
  return data;
}

export async function updateTask(taskId: string, updates: Partial<Task>) {
  const { error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId);
  
  if (error) console.error("updateTask error:", error);
}

export async function deleteTask(taskId: string) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);
  
  if (error) console.error("deleteTask error:", error);
}

export async function getProjects(userId: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId)
    .order("created_at");
  
  if (error) console.error("getProjects error:", error);
  return data || [];
}

export async function createProject(userId: string, name: string, color: string) {
  const { data, error } = await supabase
    .from("projects")
    .insert({ user_id: userId, name, color })
    .select()
    .single();
  
  if (error) console.error("createProject error:", error);
  return data;
}
