"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advance";
}

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  // Convert skill level to numeric percentage
  const getProgressValue = (level: Skill["level"]) => {
    switch (level) {
      case "Beginner":
        return 40;
      case "Intermediate":
        return 70;
      case "Advance":
        return 90;
      default:
        return 0;
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="mt-16"
    >
      <h2 className="text-3xl font-semibold text-purple-600 mb-8">
        Technical Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-x-40">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between mb-2 gap-2 items-center">
              <span className="text-base font-medium dark:text-primary-foreground">
                {skill.name}
              </span>
            <small className="text-xs text-gray-400 dark:text-gray-500 mt-2 italic">
              {skill.level}
            </small>
              <span className="text-sm text-primary dark:text-primary-foreground">
                {getProgressValue(skill.level)}%
              </span>
            </div>
            <Progress
              value={getProgressValue(skill.level)}
              className="h-3 border bg-purple-200"
            />

          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
