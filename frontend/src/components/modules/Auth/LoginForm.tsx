"use client";

import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn } from "lucide-react";
import { motion } from "framer-motion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/Password";

export default function LoginForm() {
  const form = useForm<FieldValues>({
    defaultValues: { email: "", password: "" },
  });

  const [focus, setFocus] = useState({ email: false, password: false });
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const values = form.watch();

  useEffect(() => {
    const { email, password } = values;
    setIsValid(
      /\S+@\S+\.\S+/.test(email) && password.trim().length >= 4
    );
  }, [values]);

  const handleFocus = (field: "email" | "password") =>
    setFocus((prev) => ({ ...prev, [field]: true }));

  const handleBlur = (field: "email" | "password") =>
    setFocus((prev) => ({ ...prev, [field]: false }));

const getLabelClass = (field: "email" | "password") =>
  `absolute left-3 rounded p-1 text-xl transition-all pointer-events-none
    ${
      focus[field] || String(values[field] ?? "").length > 0
        ? "-top-4 text-sm bg-purple-200 dark:bg-purple-900 text-black dark:text-white"
        : "top-2 text-gray-400"
    }`;


  const onSubmit = async (data: FieldValues) => {
    setLoading(true);
    try {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/dashboard",
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen px-4">
      <div className="w-full max-w-md bg-gradient-to-r from-purple-500/5 to-indigo-500/5 
        dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-md rounded-2xl 
        shadow-xl p-8 md:p-10">
        
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">Login</h2>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      type="email"
                      {...field}
                      onFocus={() => handleFocus("email")}
                      onBlur={() => handleBlur("email")}
                      className="w-full h-[50px] border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0"
                      placeholder=""
                      required
                    />
                  </FormControl>
                  <Label htmlFor="email" className={getLabelClass("email")}>
                    Email
                  </Label>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Password
                      {...field}
                      onFocus={() => handleFocus("password")}
                      onBlur={() => handleBlur("password")}
                      className="w-full h-[50px] border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0"
                      placeholder=""
                      required
                    />
                  </FormControl>
                  <Label htmlFor="password" className={getLabelClass("password")}>
                    Password
                  </Label>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div whileHover={{ scale: isValid ? 1.05 : 1 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={!isValid || loading}
                className={`w-full h-10 flex items-center justify-center gap-2 font-semibold py-2 rounded-lg shadow-lg transition-all
                  ${
                    isValid && !loading
                      ? "bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500"
                      : "bg-purple-600 cursor-not-allowed"
                  }`}
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <LogIn
                      className={`h-5 w-5 transition-all ${
                        isValid ? "text-white drop-shadow-glow animate-pulse" : "text-gray-400"
                      }`}
                    />
                    Sign In
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </section>
  );
}
