/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EyeIcon } from "lucide-react";

export default function BlogCard({ blogs }: { blogs: any[] }) {
  if (!blogs.length)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-muted-foreground text-lg animate-pulse">
          No blogs found...
        </p>
      </div>
    );

  const featured = blogs[0];
  const others = blogs.slice(1);

  return (
    <section className="max-w-7xl mx-auto py-20 px-6 md:px-10">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500 mb-3">
          Blog Insight
        </h1>
        <motion.div
          className="mx-auto h-[3px] w-24 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Latest stories, tutorials, and insights.
        </p>
      </div>

      {/* Featured Blog */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20 rounded-3xl overflow-hidden group hover:shadow-primary hover:shadow-lg transition-shadow"
        >
          <div className="relative overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="transition-transform duration-700"
            >
              <Image
                src={featured.thumbnail}
                alt={featured.title}
                width={1200}
                height={500}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          </div>

          <div className="absolute bottom-0 left-0 p-8 md:p-12 bg-background/60 backdrop-blur-xl w-full rounded-t-3xl">
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag: string, idx: number) => (
                <motion.span
                  key={idx}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    transition: { delay: idx * 0.1 },
                  }}
                  className="font-semibold lowercase text-blue-600"
                >
                  #{tag}
                </motion.span>
              ))}
            </div>

            <Link href={`/blogs/${featured.id}`}>
              <h2 className="text-3xl md:text-4xl font-bold leading-snug drop-shadow-md text-black dark:text-white hover:text-purple-800 dark:">
                {featured.title}
              </h2>
            </Link>
            <p className="text-sm md:text-base text-foreground line-clamp-3 mb-3 truncate">
              {featured.content}
            </p>

            <div className="flex items-center justify-between gap-5 text-sm text-muted-foreground">
              <div className="flex gap-5">
                <span className="">
                  {new Date(featured.createdAt).toDateString()}
                </span>
                <span className="flex items-center ">
                  <EyeIcon className="h-4" />
                  {featured.views}
                </span>
              </div>
              <Link
                href={`/blogs/${featured.id}`}
                className="inline-block bg-gradient-to-r from-primary to-purple-500 text-white font-medium px-5 py-2 rounded-full hover:scale-105 transform transition"
              >
                Read more
              </Link>
            </div>
          </div>
        </motion.div>
      )}

      {/* Other Blogs */}
      <div className="flex flex-col gap-12">
        {others.map((blog, i) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className={`relative flex flex-col md:flex-row items-center gap-6 p-6 rounded-3xl bg-background/50 backdrop-blur-sm border border-border shadow-lg hover:shadow-primary hover:shadow-lg transition-all ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            }`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-full md:w-1/2 h-48 md:h-64 overflow-hidden rounded-2xl"
            >
              <Image
                src={blog.thumbnail}
                alt={blog.title}
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-50" />
            </motion.div>

            <div className="flex flex-col justify-between w-full md:w-1/2 p-2 md:p-4">
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {blog.tags.map((tag: string, idx: number) => (
                    <motion.span
                      key={idx}
                      initial={{ y: 5, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: { delay: idx * 0.1 },
                      }}
                      className="font-semibold lowercase text-blue-500"
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-lg md:text-xl font-semibold mb-2 hover:text-primary transition-colors"
                >
                  {blog.title}
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-3 truncate">
                  {blog.content}
                </p>
              </div>

              <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                <div className="flex gap-5">
                  <span>{new Date(blog.createdAt).toDateString()}</span>
                  <span className="flex items-center">
                    <EyeIcon className="h-4" />
                    {blog.views}
                  </span>
                </div>
                <Link
                  href={`/blogs/${blog.id}`}
                  className="text-sm font-semibold text-primary hover:underline mx-5"
                >
                  Read more
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
