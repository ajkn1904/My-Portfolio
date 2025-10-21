import { Project } from "../types";


export async function getProjects(): Promise<Project[]> {
  const res =  await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/projects`, {
    next: { tags: ["projects"] },
  });

  const data = await res.json();
  return data?.data || [];
}
