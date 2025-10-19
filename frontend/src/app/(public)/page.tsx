/* eslint-disable @typescript-eslint/no-explicit-any */
import AboutMe from "@/components/modules/Home/AboutMe";
import HeroSection from "@/components/modules/Home/Hero";
import { getProfileData } from "@/components/services/getAboutMe";


export default async function HomePage() {

  const profile = await getProfileData();

  return (
    <div>
      <HeroSection />
      <AboutMe profile={profile}/>
    </div>
  );
}
