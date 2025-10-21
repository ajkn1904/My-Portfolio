/* eslint-disable @typescript-eslint/no-explicit-any */
import AboutMe from "@/components/modules/Home/AboutMe";
import ContactMe from "@/components/modules/Home/ContactMe";
import HeroSection from "@/components/modules/Home/Hero";
import Projects from "@/components/modules/Home/Projects";
import { getProfileData } from "@/components/services/getAboutMe";


export default async function HomePage() {

  const profile = await getProfileData();

  return (
    <div>
      <HeroSection />
      <AboutMe profile={profile}/>
      <Projects/>
      <ContactMe/>
    </div>
  );
}
