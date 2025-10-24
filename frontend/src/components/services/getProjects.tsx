import { Project } from "../types";


// ISR fetch function
export async function getProjects(): Promise<Project[]> {
  const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    next: { revalidate: 1296000, tags: ['projects'] },
  });

  const data = await res.json();
  return data?.data || [];
}
