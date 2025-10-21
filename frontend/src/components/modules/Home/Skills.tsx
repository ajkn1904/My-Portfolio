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

  const getLevelColor = (level: Skill["level"]) => {
    switch (level) {
      case "Beginner":
        return "from-purple-400 to-purple-600";
      case "Intermediate":
        return "from-indigo-400 to-indigo-600";
      case "Advance":
        return "from-pink-400 to-pink-600";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="pt-20"
    >
      <h2 className="text-3xl font-bold text-purple-600 mb-12 text-center md:text-left">
        Technical Skills
      </h2>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-x-40">
        {skills.map((skill, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 dark:bg-purple-400" />
                <span className="text-base font-semibold dark:text-white">
                  {skill.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <small
                  className={`text-xs italic ${
                    skill.level === "Beginner"
                      ? "text-purple-600 dark:text-purple-300"
                      : skill.level === "Intermediate"
                      ? "text-indigo-600 dark:text-indigo-300"
                      : "text-blue-600 dark:text-pink-300"
                  }`}
                >
                  {skill.level}
                </small>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {getProgressValue(skill.level)}%
                </span>
              </div>
            </div>

            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${getProgressValue(skill.level)}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <Progress
                value={getProgressValue(skill.level)}
                className={`h-3 rounded-full bg-purple-200 dark:bg-gray-700 overflow-hidden`}
                style={{
                  background: `linear-gradient(to right, var(--tw-gradient-stops))`,
                }}
              >
                <div
                  className={`h-3 rounded-full bg-gradient-to-r ${getLevelColor(
                    skill.level
                  )}`}
                />
              </Progress>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
