"use client";

import Image from "next/image";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 container flex flex-col lg:flex-row items-center justify-between gap-5 h-screen px-10 md:px-20 pl-[120px] lg:pl-[10%] overflow-hidden text-white lg:text-black">
      {/* Left Section */}
      <div className="max-w-xl bg-purple-500/40 lg:bg-purple-50/0 p-4 lg:p-none space-y-2 z-10">
        <p className="lg:text-gray-600 text-lg">👋 Hi There,</p>

        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-2xl font-bold pt-[5vh] mb-8"
        >
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold lg:text-[#3b143e]">
            ANIKA JUMANA KHANAM NISHAT
          </p>
        </motion.h1>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2 }}
        >
          <p className="text-xl">
            A{" "}
            <Typewriter
              loop
              cursor
              cursorStyle="."
              typeSpeed={50}
              deleteSpeed={50}
              delaySpeed={1000}
              words={[
                "Software Engineer",
                "Web Developer",
                "MERN Stack Developer",
              ]}
            />{" "}
          </p>
          <p className="text-xl w-[350px] md:w-[500px] mx-auto md:mx-0 mt-2">
            I&apos;m passionate about creating seamless UI/UX experiences that drive success.
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gray-800 text-white font-semibold px-6 py-3 rounded-full hover:bg-primary transition"
        >
          👇 More About Me
        </motion.button>

        {/* Contact Info */}
        <div className="pt-8 grid md:grid-cols-2 justify-between gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="font-semibold lg:text-gray-700" />
            <span> anika.nishat06@gmail.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="font-semibold lg:text-gray-700"/>
            <span>+8801521228030</span>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
        // Down-lay (bottom) only for small & medium, side position for large
        className="
          w-full lg:w-[50%] 
          flex justify-center lg:justify-end 
          absolute md:absolute lg:relative 
          top-0 lg:bottom-auto 
          right-0 
        "
      >
        <Image
          src="/hero_image.jpg"
          alt="banner image"
          width={700}
          height={700}
          className="
            w-full h-[600px] lg:max-h-none md:w-[90%] lg:w-full 
            object-cover 
            rounded-t-3xl lg:rounded-2xl
          "
        />
      </motion.div>
    </section>
  );
}
