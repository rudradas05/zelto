"use client";

import { Mail, User, Lock, ArrowLeft, EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);

  const formValidation = name !== "" && email !== "" && password !== "";

  // const handleRegister = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!formValidation || isLoading) return;

  //   try {
  //     setIsLoading(true);

  //     await axios.post("/api/auth/register", {
  //       name,
  //       email,
  //       password,
  //     });

  //     // ✅ SUCCESS TOAST
  //     toast.success("Account created successfully!");

  //     // ✅ CLEAR FIELDS
  //     setName("");
  //     setEmail("");
  //     setPassword("");
  //     setShowPassword(false);

  //     // optional redirect
  //     // router.push("/sign-in");
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formValidation || isLoading) return;

    try {
      setIsLoading(true);

      // 1️⃣ Register
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      // 2️⃣ Auto sign-in
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Account created successfully!");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-green-100 via-white to-emerald-50 px-4">
      {/* Back */}
      <motion.button
        onClick={() => router.push("/")}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute left-6 top-6 flex items-center gap-2 text-green-600 hover:text-green-700 transition"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="text-lg font-medium">Back</span>
      </motion.button>

      {/* Center */}
      <div className="flex min-h-screen items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-xl p-10
          shadow-[0_30px_80px_rgba(0,0,0,0.12)] border border-white/60"
        >
          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
              Create account
            </h1>
            <p className="mt-3 text-[15px] text-gray-500">Join Zelto today</p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-7">
            {/* Name */}
            <div className="relative">
              <User className="absolute left-0 top-3 h-5 w-5 text-gray-400" />
              <input
                className="w-full border-b border-gray-300 bg-transparent py-3 pl-8 pr-2
                text-gray-900 placeholder-gray-400 focus:border-green-600
                focus:outline-none transition-all duration-200"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-0 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                className="w-full border-b border-gray-300 bg-transparent py-3 pl-8 pr-2
                text-gray-900 placeholder-gray-400 focus:border-green-600
                focus:outline-none transition-all duration-200"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-0 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border-b border-gray-300 bg-transparent py-3 pl-8 pr-10
                text-gray-900 placeholder-gray-400 focus:border-green-600
                focus:outline-none transition-all duration-200"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-3 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={!formValidation || isLoading}
              whileHover={formValidation && !isLoading ? { scale: 1.02 } : {}}
              whileTap={formValidation && !isLoading ? { scale: 0.97 } : {}}
              className={`w-full font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg
                ${
                  formValidation && !isLoading
                    ? "bg-green-600 hover:bg-green-700 hover:shadow-green-500/30 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                }`}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="relative my-8 text-center">
            <span className="relative z-10 bg-white px-3 text-xs text-gray-400">
              OR
            </span>
            <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
          </div>

          {/* Google */}
          {/* <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-3 rounded-xl
            border border-gray-300 py-3 text-sm font-medium text-gray-700
            hover:bg-gray-100 transition shadow-sm cursor-pointer"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          > */}
          <motion.button
            disabled={oauthLoading}
            onClick={() => {
              setOauthLoading(true);
              signIn("google", { callbackUrl: "/" });
            }}
            className={`flex w-full items-center justify-center gap-3 rounded-xl
    border py-3 text-sm font-medium transition
    ${
      oauthLoading
        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
        : "border-gray-300 text-gray-700 hover:bg-gray-100"
    }`}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="h-4 w-4"
              alt="google"
            />
            Continue with Google
          </motion.button>

          {/* Footer */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/sign-in")}
              className="text-green-600 hover:text-green-700 font-semibold transition cursor-pointer"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
