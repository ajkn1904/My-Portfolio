export async function getAllBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    next: { 
      revalidate: 2, 
      tags: ["blogs"] 
    },
  });
  const data = await res.json();
  return data?.data?.data || [];
}
