export const getBlogById = async (blogId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs/${blogId}`, {
    next: {
        revalidate: 2, 
        tags: ["blogs"] 
    }
  });
  return await res.json();
};