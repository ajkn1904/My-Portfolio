"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Skills, { Skill } from "./Skills";
import { Profile } from "@/components/services/getAboutMe";

interface AboutMeProps {
  profile: Profile;
}

export default function AboutMe({ profile }: AboutMeProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
        <h2 className="text-3xl font-semibold text-purple-600 mb-6">About Me</h2>
      {/* Header */}
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
          <p className="text-gray-700 mt-2">{profile.degree}</p>
          <p className="text-gray-600">{profile.institution}</p>
          <p className="text-gray-500 mt-1">CGPA: {profile.cgpa}</p>

          <div className="mt-4 text-sm text-gray-700 space-y-1">
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Official:</strong> {profile.officialEmail}</p>
            <p><strong>Contact:</strong> {profile.contact}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>

          <div className="flex gap-4 mt-4">
            <a href={profile.github} target="_blank" className="text-purple-600 hover:text-purple-800 font-medium">GitHub</a>
            <a href={profile.linkedin} target="_blank" className="text-purple-600 hover:text-purple-800 font-medium">LinkedIn</a>
            <a href={profile.stackoverflow} target="_blank" className="text-purple-600 hover:text-purple-800 font-medium">Stack Overflow</a>
          </div>

          <p className="mt-5 text-gray-700 leading-relaxed max-w-lg">
            I’m a passionate <span className="font-semibold text-purple-600">MERN Stack Developer</span> 
            with hands-on experience in building full-stack web applications. I love creating
            efficient, scalable, and elegant solutions while continuously learning new technologies.
          </p>
        </motion.div>
      </div>

      {/* Experience */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-purple-600 mb-6">
          Professional Experience
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {profile.experiences.map((exp, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="p-5 border border-purple-200 rounded-2xl shadow-sm bg-gradient-to-br from-white to-purple-50"
            >
              <h3 className="text-xl font-semibold text-purple-700">{exp.post}</h3>
              <p className="text-gray-700">{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.duration}</p>
              <p className="text-sm text-gray-600">{exp.location}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <Skills skills={profile.skills as Skill[]} />
    </motion.section>
  );
}
