
import AboutMe from "@/components/modules/Home/AboutMe";
import ContactMe from "@/components/modules/Home/ContactMe";
import HeroSection from "@/components/modules/Home/Hero";
import Projects from "@/components/modules/Home/Projects";
import {  getStaticProps } from "@/components/services/getAboutMe";


export default async function HomePage() {

  const profile = await getStaticProps();

  return (
    <div>
      <HeroSection />
      <AboutMe profile={profile.props.data.data}/>
      <Projects/>
      <ContactMe/>
    </div>
  );
}
