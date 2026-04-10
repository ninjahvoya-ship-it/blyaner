import { useState, useEffect } from 'react';
import { useUser } from '../lib/auth';
import { getProjects, createProject, deleteProject, Project } from '../lib/tasks';

export function useProjects() {
  const { user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    loadProjects();
  }, [user]);

  const loadProjects = async () => {
    if (!user) return;
    setIsLoading(true);
    const data = await getProjects(user.id);
    setProjects(data);
    setIsLoading(false);
  };

  const addProject = async (name: string, color: string) => {
    if (!user) return null;
    const newProject = await createProject(user.id, name, color);
    if (newProject) {
      setProjects([...projects, newProject]);
    }
    return newProject;
  };

  const removeProject = async (id: string) => {
    await deleteProject(id);
    setProjects(projects.filter(p => p.id !== id));
  };

  return { projects, isLoading, addProject, removeProject, refresh: loadProjects };
}
