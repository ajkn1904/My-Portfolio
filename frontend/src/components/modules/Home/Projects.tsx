"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { getProjects } from "@/components/services/getProjects";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Project } from "@/components/types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects).catch(console.error);
  }, []);

  if (!projects.length)
    return (
      <div className="flex justify-center items-center h-40 text-purple-400 font-semibold">
        Loading Projects...
      </div>
    );

  const featuredProjects = projects.slice(0, 3);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="max-w-6xl mx-auto px-6 py-20"
    >
      <h2 className="text-3xl font-semibold text-purple-600 mb-6 text-center">
        Featured Projects
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 mb-12">
        {featuredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ rotate: -0.95 }}
          >
            <Card className="group relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-b from-primary-600/80 to-primary-500/60 backdrop-blur-xl shadow-lg hover:shadow-purple-500/70 transition-all duration-500 p-0">
              
              
              
              <div className="relative w-full h-56 overflow-hidden">
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              </div>

              
              
              <CardContent className="p-6">
                <h3 className="text-2xl font-semibold tracking-wide mb-2">
                  {project.name}
                </h3>
                <p className="mb-4 text-sm font-light">{project.intro}</p>

               
               
                <div className="flex justify-between items-center mt-6 bg-purple-600 dark:bg-black/60 border border-purple-600/40 rounded-full px-6 py-3 transition-all duration-300 hover:border-purple-400 hover:bg-white text-white hover:text-black dark:text-white hover:border-purple-500">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-2 duration-300 hover:underline"
                  >
                    <span>View Details</span>
                  </Link>

                  <div className="flex items-center justify-between gap-2">
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-1 text-sm font-medium hover:text-purple-800 dark:hover:text-purple-400"
                    >
                      <Github className="w-4 h-4" /> Code
                    </Link>
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="flex items-center gap-1 text-sm font-medium hover:text-blue-700 dark:hover:text-blue-400"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </Link>
                  </div>
                </div>
              </CardContent>


              <motion.div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700"
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  transition: { duration: 3, repeat: Infinity },
                }}
              />
            </Card>
          </motion.div>
        ))}
      </div>

     
      <div className="flex justify-center">
        <Link href="/projects">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-8 py-2 text-lg transition-all duration-300 hover:shadow-md shadow-purple-700">
            Show More
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}
