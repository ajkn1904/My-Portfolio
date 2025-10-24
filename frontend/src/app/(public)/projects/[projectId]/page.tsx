import Link from "next/link";
import { Dot } from "lucide-react";
import ProjectImageGallery from "@/components/services/ProjectImageGallery";
import { Project } from "@/components/types";


export default async function ProjectDetailsPage({ params }: { params: { projectId: string } }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects/${params.projectId}`);
    const data = await res.json();
    const project: Project = data?.data;

    if (!project) {
        return <div className="flex justify-center items-center h-80 text-purple-400 text-xl font-semibold">Project not found</div>;
    }

    return <ProjectDetails project={project} />;
}

function ProjectDetails({ project }: { project: Project }) {
    return (
        <section className="min-h-screen py-20 px-6">

            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-purple-600 dark:text-purple-400 mb-4">{project.name}</h1>
                <p className="text-lg">{project.intro}</p>
            </div>

            {/* Image Gallery */}
            <div className="max-w-6xl mx-auto mb-20">
                <ProjectImageGallery git={project.githubLink} live={project.liveLink} uiImages={project.uiImages} projectName={project.name} />
            </div>
  

            {/* Project Details */}
            <div className="max-w-6xl mx-auto bg-gradient-to-br dark:from-gray-800/40 dark:to-gray-900/60 border border-purple-600/30 rounded-3xl p-10 shadow-lg">
                <h2 className="text-3xl font-semibold text-purple-600 mb-6 font-semibold dark:text-purple-400 mb-8">Features</h2>
                <div className="max-w-2xl space-y-4 mb-12 lg:ml-6 ">
                    {project.details.map((d) => (
                        <p key={d.id} className="text-lg leading-relaxed pl-4 flex gap-1"><Dot className="text-purple-500 dark:text-purple-400 w-10 h-10"/> <span>{d.text}</span></p>
                    ))}
                </div>
                <div>
                    <h3 className="text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-4 ">Tech Stack</h3>
                    <div className="flex flex-wrap justify-start gap-4 ml-8 lg:ml-12">
                        {project.techStacks.map((t) => (
                            <span key={t.id} className="dark:bg-purple-700/20 border border-purple-600/40 dark:text-purple-300 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300">
                                {t.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mt-16">
                <Link href="/projects" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-white font-medium transition-all duration-300 shadow-md hover:shadow-purple-700/50">
                    ← Go Back
                </Link>
            </div>
        </section>
    );
}
