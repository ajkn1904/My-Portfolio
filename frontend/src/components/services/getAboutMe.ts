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
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/`, {
    next: { revalidate: 2592000 }, // SSG with revalidate every 30 days 
  });

  if (!res.ok) throw new Error("Failed to fetch profile data");

  const data = await res.json();
  return data.data;
}
