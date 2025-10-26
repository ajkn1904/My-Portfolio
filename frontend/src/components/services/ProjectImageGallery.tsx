"use client";

import { PhotoProvider, PhotoView } from "react-photo-view";
import Image from "next/image";
import { useState } from "react";
import Loading from "../ui/Loading";
import Link from "next/link";
import { ExternalLink, Github } from "lucide-react";
import { ProjectImageGalleryProps } from "../types";

export default function ProjectImageGallery({
  uiImages,
  projectName,
  git,
  live,
}: ProjectImageGalleryProps) {
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const handleLoad = (id: number) => {
    setLoadedImages((prev) => [...prev, id]);
  };

  return (
    <PhotoProvider>
      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        {uiImages.map((ui, idx) => {
          const isLoaded = loadedImages.includes(ui.id);

          return (
            <PhotoView key={ui.id} src={ui.value}>
              <div className="relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer bg-gray-800 flex items-center justify-center">
                {/* Loading Overlay */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex justify-center items-center bg-gray-900/40">
                    <Loading />
                  </div>
                )}

                {/* Image */}
                <Image
                  src={ui.value}
                  alt={`Screenshot of ${projectName}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading={idx === 0 ? "eager" : "lazy"}
                  priority={idx === 0}
                  className={`object-cover transition-transform duration-700 hover:scale-110 ${
                    isLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => handleLoad(ui.id)}
                />

                {/* Dark Gradient Overlay on hover */}
                <div className="absolute inset-0 dark:bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 hover:opacity-100 transition-all duration-500" />
              </div>
            </PhotoView>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center items-center gap-6">
        <Link
          href={git}
          target="_blank"
          className="flex items-center gap-3 border border-purple-500 px-6 py-3 rounded-full text-white dark:text-purple-300 bg-purple-600/90 hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-purple-700/50"
        >
          <Github className="w-5 h-5" /> Code Repository
        </Link>

        <Link
          href={live}
          target="_blank"
          className="flex items-center gap-3 border border-blue-500 px-6 py-3 rounded-full text-white dark:text-blue-400 bg-blue-600/90 hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-blue-700/50"
        >
          <ExternalLink className="w-5 h-5" /> Live Demo
        </Link>
      </div>
    </PhotoProvider>
  );
}
