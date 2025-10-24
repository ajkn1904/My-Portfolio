import BlogCard from "@/components/modules/blogs/BlogCard";
import { getAllBlogs } from "@/components/services/getAllBlogs";


export default async function BlogsPage() {
  const blogs = await getAllBlogs();
  return <BlogCard blogs={blogs} />;
}
