"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { useState } from "react";
import Loading from "../ui/Loading";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { ProjectImageGalleryProps } from "../types";



export default function ProjectImageGallery({ uiImages, projectName, git, live }: ProjectImageGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<number[]>([]); 

  const handleLoad = (id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  };

  return (
    <PhotoProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {uiImages.map((ui) => {
          const isLoaded = loadedImages.includes(ui.id);

          return (
            <PhotoView key={ui.id} src={ui.value}>
              <div className="relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer bg-gray-800 flex items-center justify-center">
                {!isLoaded && (
                  <Loading/>
                )}
                <Image
                  src={ui.value}
                  alt={`Screenshot of ${projectName}`}
                  fill
                  className={`object-cover transition-transform duration-700 hover:scale-110 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoadingComplete={() => handleLoad(ui.id)}
                />
                <div className="absolute inset-0 dark:bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-all duration-500" />
              </div>
            </PhotoView>
          );
        })}


        {/* Buttons */}
            <div className="flex justify-center items-center gap-6">
                <Link href={git} target="_blank" className="flex items-center gap-3 border border-purple-500 px-6 py-3 rounded-full text-white dark:text-purple-300 bg-primary dark:bg-gray-900 hover:bg-accent dark:hover:bg-purple-600/20 text-purple-700 hover:text-black dark:hover:text-white transition-all duration-300 hover:shadow-lg">
                    <Github className="w-5 h-5" /> Code Repository
                </Link>
                <Link href={live} target="_blank" className="flex items-center gap-3 border border-blue-500 px-6 py-3 rounded-full text-white dark:text-blue-500 bg-blue-500 dark:bg-gray-900 
                hover:bg-blue-500/30 dark:hover:bg-blue-600/20 hover:text-black dark:hover:text-white transition-all duration-300 hover:shadow-lg">
                    <ExternalLink className="w-5 h-5" /> Live Demo
                </Link>
            </div>
      </div>
    </PhotoProvider>
  );
}
