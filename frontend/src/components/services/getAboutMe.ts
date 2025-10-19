// src/lib/about.ts

export interface Experience {
  post: string;
  company: string;
  duration: string;
  location: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  email: string;
  officialEmail: string;
  contact: string;
  photoUrl: string;
  address: string;
  institution: string;
  degree: string;
  cgpa: number;
  github: string;
  linkedin: string;
  stackoverflow: string;
  experiences: Experience[];
  skills: Skill[];
}

// SSG fetch function
export async function getProfileData(): Promise<Profile> {
  const res = await fetch("http://localhost:5000/api/admin/", {
    next: { revalidate: 60 }, // SSG with revalidate every 60s
  });

  if (!res.ok) throw new Error("Failed to fetch profile data");

  const data = await res.json();
  return data.data; // assuming API returns { data: Profile }
}
