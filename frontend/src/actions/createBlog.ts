import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlog(formData: FormData, token: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blogs`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (result?.data?.id) {
    // Revalidate ISR caches
    revalidateTag("blogs");
    revalidatePath("/blogs");

    // Optional server-side redirect
    redirect("/blogs");
  }

  return result;
}
