"use client";

import { useRef, FormEvent, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const ContactMe = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    message: "",
  });

  // Check form validity dynamically
  useEffect(() => {
    const { userName, userEmail, message } = formData;
    setIsValid(
      userName.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(userEmail) &&
      message.trim().length > 1
    );
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    setLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_TEMP_ID as string,
        form.current,
        process.env.NEXT_PUBLIC_PUBLIC_KEY as string
      );
      toast.success("Message submitted successfully!");
      form.current.reset();
      setFormData({ userName: "", userEmail: "", message: "" });
    } catch (error: any) {
      console.error(error.text);
      toast.error("Failed to send message. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-20 scroll-mt-20">
      <h2 className="text-3xl font-semibold text-purple-600 mb-6">
        Contact Me
      </h2>

      <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12">
        <form ref={form} onSubmit={sendEmail} className="space-y-8">
          {/* Name Field */}
          <div className="relative">
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              id="userName"
              className="peer w-full h-[50] border-purple-400 dark:border-purple-700 bg-transparent placeholder-transparent focus:border-purple-500 focus:ring-0"
              placeholder=""
              required
            />
            <label
              htmlFor="userName"
              className="absolute left-3 -top-3.5 bg-transparent peer-focus:bg-purple-200 peer-focus:dark:bg-purple-900 text-xl rounded p-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-black peer-focus:dark:text-white peer-focus:text-sm"
            >
              Name
            </label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <Input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              id="userEmail"
              className="peer w-full h-[50] border-purple-400 dark:border-purple-700 bg-transparent placeholder-transparent focus:border-purple-500 focus:ring-0"
              placeholder=""
              required
            />
            <label
              htmlFor="userEmail"
              className="absolute left-3 -top-3.5 bg-transparent peer-focus:bg-purple-200 peer-focus:dark:bg-purple-900 text-xl rounded p-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-black peer-focus:dark:text-white peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              id="message"
              className="peer w-full border-purple-400 dark:border-purple-700 bg-transparent placeholder-transparent focus:border-purple-500 focus:ring-0 h-32 resize-none"
              placeholder=""
              required
            />
            <label
              htmlFor="message"
              className="absolute left-3 -top-3.5 bg-transparent peer-focus:bg-purple-200 peer-focus:dark:bg-purple-900 text-xl rounded p-1 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-black peer-focus:dark:text-white peer-focus:text-sm"
            >
             Your Message
            </label>
          </div>

          
          <motion.div whileHover={{ scale: isValid ? 1.05 : 1 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full h-10 flex items-center justify-center gap-2 font-semibold py-2 rounded-lg shadow-lg transition-all 
                ${isValid && !loading
                  ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500"
                  : "bg-gray-600 cursor-not-allowed"
                }`}
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Send
                    className={`h-5 w-5 transition-all ${
                      isValid ? "text-white drop-shadow-glow animate-pulse" : "text-gray-400"
                    }`}
                  />
                  Send Message
                </>
              )}
            </Button>
          </motion.div>
        </form>
      </div>
    </section>
  );
};

export default ContactMe;
