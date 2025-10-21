"use client";

import { Project } from "@/components/types";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-7xl mx-auto px-6 py-20"
    >
     
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-3">
          Project Showcase
        </h1>
        <motion.div
          className="mx-auto h-[3px] w-24 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm md:text-base">
          A curated collection of my recent work and experiments 💻
        </p>
      </div>


      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="relative group overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-700/20 via-purple-900/10 to-transparent backdrop-blur-lg shadow-xl hover:shadow-purple-600/40 transition-all duration-500"
          >
            
            <div className="relative w-full h-56 overflow-hidden">
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={project.img}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority={idx < 3}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-30 transition-all duration-500" />
            </div>

            
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-purple-600 group-hover:text-purple-500 transition-colors duration-300 mb-2">
                  {project.name}
                </h2>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {project.intro}
                </p>

                
                {project.details?.length > 0 && (
                  <p className="text-xs italic mb-4">
                    ✨ {project.details[0].text}...
                  </p>
                )}

            
              </div>

              <div className="flex justify-between items-center">
                <Link
                  href={`/projects/${project.id}`}
                  className="text-purple-500 hover:text-purple-700 dark:hover:text-purple-400 font-semibold text-sm transition-all duration-200"
                >
                  View Details →
                </Link>
                <div className="flex items-center gap-3">
                  {project.githubLink && (
                    <Link
                      href={project.githubLink}
                      target="_blank"
                      className="flex items-center gap-1 text-sm font-medium hover:text-purple-400"
                    >
                      <Github className="w-4 h-4" /> Code
                    </Link>
                  )}
                  {project.liveLink && (
                    <Link
                      href={project.liveLink}
                      target="_blank"
                      className="flex items-center gap-1 text-sm font-medium hover:text-blue-400"
                    >
                      <ExternalLink className="w-4 h-4" /> Live
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* 🌈 Subtle Animated Glow */}
            <motion.div
              className=""
              animate={{
                opacity: [0.1, 0.3, 0.1],
                transition: { duration: 3, repeat: Infinity },
              }}
            />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
