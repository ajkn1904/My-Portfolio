import { getProjects } from "@/components/services/getProjects";
import { ProjectsGrid } from "./ProjectsGrid";

export const revalidate = 1296000; // 15 days ISR

export default async function AllProjectsPage() {
  const projects = await getProjects();

  if (!projects.length) {
    return (
      <section className="min-h-[60vh] flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">
          Project Showcase
        </h1>
        <p className="text-gray-500 text-lg">No projects found yet.</p>
      </section>
    );
  }

  return <ProjectsGrid projects={projects} />;
}
