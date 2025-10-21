"use client";

import { useRef, FormEvent, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";

const ContactMe = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    message: "",
  });

  const [focus, setFocus] = useState({
    userName: false,
    userEmail: false,
    message: false,
  });

  useEffect(() => {
    const { userName, userEmail, message } = formData;
    setIsValid(
      userName.trim().length > 1 &&
        /\S+@\S+\.\S+/.test(userEmail) &&
        message.trim().length > 1
    );
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFocus = (field: string) => {
    setFocus((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string) => {
    setFocus((prev) => ({ ...prev, [field]: false }));
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

  const getLabelClass = (field: keyof typeof formData) =>
    `absolute left-3 rounded p-1 text-xl transition-all
      ${
        focus[field] || formData[field].length > 0
          ? "-top-4 text-sm bg-purple-200 dark:bg-purple-900 text-black dark:text-white"
          : "top-2 text-gray-400"
      }`;

  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 pb-40 scroll-mt-20">
      <h2 className="text-3xl font-semibold text-purple-600 mb-6">Contact Me</h2>

      <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500/5 to-indigo-500/5 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12">
        <form ref={form} onSubmit={sendEmail} className="space-y-8">
          {/* Name Field */}
          <div className="relative">
            <Input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              onFocus={() => handleFocus("userName")}
              onBlur={() => handleBlur("userName")}
              id="userName"
              className="w-full h-[50px] border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0"
              placeholder=""
              required
            />
            <Label htmlFor="userName" className={getLabelClass("userName")}>
              Name
            </Label>
          </div>

          {/* Email Field */}
          <div className="relative">
            <Input
              type="email"
              name="userEmail"
              value={formData.userEmail}
              onChange={handleChange}
              onFocus={() => handleFocus("userEmail")}
              onBlur={() => handleBlur("userEmail")}
              id="userEmail"
              className="w-full h-[50px] border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0"
              placeholder=""
              required
            />
            <Label htmlFor="userEmail" className={getLabelClass("userEmail")}>
              Email
            </Label>
          </div>

          {/* Message Field */}
          <div className="relative">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onFocus={() => handleFocus("message")}
              onBlur={() => handleBlur("message")}
              id="message"
              className="w-full border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0 h-32 resize-none pt-3"
              placeholder=""
              required
            />
            <Label htmlFor="message" className={getLabelClass("message")}>
              Your Message
            </Label>
          </div>

          <motion.div whileHover={{ scale: isValid ? 1.05 : 1 }} whileTap={{ scale: 0.95 }}>
            <Button
              type="submit"
              disabled={!isValid || loading}
              className={`w-full h-10 flex items-center justify-center gap-2 font-semibold py-2 rounded-lg shadow-lg transition-all
                ${
                  isValid && !loading
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500"
                    : "bg-purple-600 pointer-none cursor-not-allowed"
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
