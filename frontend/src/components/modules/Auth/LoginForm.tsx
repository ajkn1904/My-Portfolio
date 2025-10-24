"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Password from "@/components/ui/Password";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { Loader2, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [focus, setFocus] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);

    const res = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (res?.error) {
      if (res.error.includes("User not found")) {
        form.setError("email", { type: "server", message: "User not found" });
      } else if (res.error.includes("Incorrect password")) {
        form.setError("password", { type: "server", message: "Incorrect password" });
      } else {
        form.setError("password", { type: "server", message: res.error });
      }
    } else if (res?.ok) {
      toast.success("Login Successful.")
      router.push("/dashboard");
    }

    setLoading(false);
  };

  const getLabelClass = (field: string, value: string) =>
    `absolute left-3 rounded px-1 text-xl transition-all
     ${focus[field] || value.length > 0
       ? "-top-4 text-sm bg-purple-200 dark:bg-purple-900 text-black dark:text-white"
       : "top-2 text-gray-400"
     } pointer-events-none`;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-gradient-to-r from-purple-500/5 to-indigo-500/5 dark:from-purple-500/20 dark:to-indigo-500/20 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
            <h2 className="text-3xl font-bold text-center text-purple-600 dark:text-purple-400">
              Login
            </h2>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder=""
                      {...field}
                      className="w-full h-[50px] border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0"
                      onFocus={() => setFocus(prev => ({ ...prev, email: true }))}
                      onBlur={() => setFocus(prev => ({ ...prev, email: false }))}
                    />
                  </FormControl>
                  <Label htmlFor="email" className={getLabelClass("email", field.value)}>
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
                      id="password"
                      placeholder=""
                      {...field}
                      className="w-full h-[50px] border-purple-400 dark:border-purple-700 bg-transparent focus:border-purple-500 focus:ring-0"
                      onFocus={() => setFocus(prev => ({ ...prev, password: true }))}
                      onBlur={() => setFocus(prev => ({ ...prev, password: false }))}
                    />
                  </FormControl>
                  <Label htmlFor="password" className={getLabelClass("password", field.value)}>
                    Password
                  </Label>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 flex items-center justify-center gap-2 font-semibold rounded-xl shadow-lg transition-all
                bg-gradient-to-r from-purple-500 to-indigo-500
                hover:from-indigo-500 hover:to-purple-500
                shadow-purple-400/50 hover:shadow-purple-500/60 text-white"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : (
                  <>
                    <LogIn className="h-5 w-5 text-white animate-pulse" />
                    Login
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
