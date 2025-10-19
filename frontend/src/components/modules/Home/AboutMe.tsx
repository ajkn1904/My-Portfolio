/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Skills, { Skill } from "./Skills";
import { Profile } from "@/components/services/getAboutMe";
import {
  Stepper,
  StepperItem,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator,
} from "@/components/ui/stepper";

interface AboutMeProps {
  profile: Profile;
}

export default function AboutMe({ profile }: AboutMeProps) {
  
  const steps = profile.experiences.map((exp: any, index: number) => ({
    step: index + 1,
    title: exp.post,
    description: exp.company,
    duration: exp.duration,
    location: exp.location,
  }));


  return (
    <motion.section
    id="about"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      {/* Header */}
      <h2 className="text-3xl font-semibold text-purple-600 mb-6">About Me</h2>
  
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Image
            src={profile.photoUrl}
            alt={profile.name}
            width={200}
            height={200}
            className="rounded-full shadow-lg border-4 border-purple-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
            {profile.name}
          </h1>


          <p className="mt-5 text-gray-700 dark:text-muted-foreground leading-relaxed max-w-2xl text-justify">I have successfully completed my {profile.degree} from {profile.institution}, achieving an impressive CGPA of {profile.cgpa} out of 4.00.
            <br />
            Driven by a deep passion for innovation and problem-solving, I aspire to lead and make meaningful contributions in the tech industry. My dream is to become a Software Engineer and make a positive impact through technology.
            <br />
            Currently, I am continuously enhancing my expertise in web development, pursuing it not only as a career path but as a true passion.
          </p>


          <div className="mt-4 text-sm text-gray-700 dark:text-muted-foreground space-y-1">
            <p className="flex gap-1">
              <strong>Email:</strong>
              <a href={`mailto:${profile.officialEmail}`} className="flex items-center gap-2 transition hover:font-semibold hover:underline hover:text-primary">{profile.officialEmail}</a>
            </p>

            <p className="flex gap-1">
              <strong>Contact:</strong> 
              <a href={`tel:${profile.contact}`} className="flex items-center gap-2 transition hover:font-semibold hover:underline hover:text-primary">{profile.contact}</a>
            </p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <a href={profile.github} target="_blank" className="text-purple-600 hover:text-purple-800 font-medium">GitHub</a>
            <a href={profile.linkedin} target="_blank" className="text-purple-600 hover:text-purple-800 font-medium">LinkedIn</a>
            <a href={profile.stackoverflow} target="_blank" className="text-purple-600 hover:text-purple-800 font-medium">Stack Overflow</a>
          </div>

        </motion.div>
      </div>


      {/* Experience */} 
      <h2 className="text-3xl font-semibold text-purple-600 mb-6">Professional Experience</h2>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto my-10 space-y-8"
      >
        <p className="lg:ml-6 my-5 text-gray-700 dark:text-muted-foreground  leading-relaxed w-full text-justify">
          I’m a passionate <span className="font-semibold text-primary">MERN Stack Developer </span>
          with hands-on experience in building full-stack web applications. I love creating
          efficient, scalable, and elegant solutions while continuously learning new technologies.
          <br />
          My experiences 👇
        </p>

        <Stepper defaultValue={steps.length + 1} orientation="vertical" className="ml-10 lg:ml-6">
          {steps.map(({ step, title, description, duration, location }: any) => (
            <StepperItem key={step} step={step} className="relative items-start not-last:flex-1">
              <div className="flex items-start pb-12 last:pb-0">
                <StepperIndicator />
                <div className="mt-0.5 space-y-0.5 px-2 text-left">
                  <StepperTitle className="font-semibold text-base lg:text-lg">{title}</StepperTitle>
                  {description && (
                    <StepperDescription className="text-sm lg:text-base font-medium">
                      {description}
                    </StepperDescription>
                  )}
                  {location && <StepperDescription>{location}</StepperDescription>}
                  {duration && (
                    <StepperDescription className="text-xs text-muted-foreground">
                      {duration}
                    </StepperDescription>
                  )}
                </div>
              </div>

              {step < steps.length && (
                <StepperSeparator className="absolute inset-y-0 top-[calc(1.5rem+0.125rem)] left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper:h-[calc(100%-1.5rem-0.25rem)]" />
              )}
            </StepperItem>
          ))}
        </Stepper>

        
      </motion.div>


      {/* Skills */}
      <Skills skills={profile.skills as Skill[]} />
    </motion.section>
  );
}
