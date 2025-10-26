/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
import Link from "next/link";
import { EyeIcon } from "lucide-react";
import { getBlogById } from "@/components/services/getBlogById";


export const generateStaticParams = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`);
  const { data: blogs } = await res.json();

    return blogs?.data?.slice(0, 2).map((blog: any) => ({
    blogId: String(blog.id),
  }));
};

export default async function BlogDetailPage({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = await params;
  const blog = await getBlogById(blogId);
   

  if (!blog) {
    return (
      <section className="flex justify-center items-center min-h-[60vh]">
        <p className="text-muted-foreground text-lg">Blog not found</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto py-20 px-6 md:px-10">
      <article>
        <div className="flex flex-col justify-end items-end text-sm text-muted-foreground mb-2">
          <span className="text-gray-500">{new Date(blog.createdAt).toDateString()}</span>
          <span className="flex items-center text-gray-500">
            <EyeIcon className="h-4" />
            {blog.views}
          </span>
        </div>
        <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
          {blog.title}
        </h1>

        

        <div className="relative w-full h-[400px] md:h-[500px] mb-10 rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose dark:prose-invert max-w-none leading-relaxed">
          <p>{blog.content}</p>
        </div>

        {blog.tags?.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {blog.tags.map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link
            href="/blogs"
            className="inline-block bg-gradient-to-r from-primary to-purple-500 text-white px-6 py-2 rounded-full font-medium hover:scale-105 transition"
          >
            ← Back to Blogs
          </Link>
        </div>
      </article>
    </section>
  );
}
