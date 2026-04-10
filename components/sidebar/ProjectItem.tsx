import { Project } from "../../lib/tasks";

interface Props {
  project: Project;
}

export default function ProjectItem({ project }: Props) {
  return (
    <div className="flex items-center gap-3 px-2 py-1.5 rounded-lg hover:bg-white/5 transition group cursor-pointer">
      <div 
        className="w-2.5 h-2.5 rounded-full" 
        style={{ backgroundColor: project.color }} 
      />
      <span className="text-sm text-white/80 group-hover:text-white transition">
        {project.name}
      </span>
    </div>
  );
}
