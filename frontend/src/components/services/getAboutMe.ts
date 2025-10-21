import { Profile } from "../types";


// SSG fetch function
export async function getProfileData(): Promise<Profile> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/admin/`, {
    cache: "force-cache"
  });

  if (!res.ok) throw new Error("Failed to fetch profile data");

  const data = await res.json();
  return data.data;
}
