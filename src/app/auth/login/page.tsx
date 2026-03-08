"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LiaEyeSolid } from "react-icons/lia";
import { FaRegEyeSlash } from "react-icons/fa";

export default function LoginPage() {
  const router = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    router("/customer");
  };

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── LEFT SIDE ───────────────────────────────────────────────────── */}
      <div className="flex-[1.1] bg-white flex flex-col relative">

        {/* Top label */}

        {/* Form centered */}
        <div className="flex-1 flex flex-col justify-center px-16 pb-10" style={{ maxWidth: 540 }}>

          {/* Logo */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black text-[#1259C3] mb-10"
          >
            Angoverso
          </motion.h1>

          {/* Welcome */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-400 text-lg mb-10"
          >
            Welcome back to Angoverso
          </motion.p>

          {/* Email field */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-7"
          >
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
              onFocus={() => setFocused("email")}
              onBlur={() => setFocused(null)}
              className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b"
              style={{
                borderBottomColor: focused === "email" ? "#1259C3" : "#C0C0C0",
                borderBottomWidth: focused === "email" ? 2 : 1,
              }}
            />
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#1259C3]"
              animate={{ width: focused === "email" ? "100%" : "0%" }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>

          {/* Password field */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="relative mb-2"
          >
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b"
              style={{
                borderBottomColor: focused === "password" ? "#1259C3" : "#C0C0C0",
                borderBottomWidth: focused === "password" ? 2 : 1,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-0 bottom-2 text-gray-400 hover:cursor-pointer bg-transparent hover:bg-transparen hover:text-gray-600 text-xs"
              tabIndex={-1}
            >
              {showPass ? <LiaEyeSolid /> : <FaRegEyeSlash />}
            </button>
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-[#1259C3]"
              animate={{ width: focused === "password" ? "100%" : "0%" }}
              transition={{ duration: 0.25 }}
            />
          </motion.div>

          {/* Forgot password */}
          <motion.a
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.34 }}
            className="flex justify-end mb-8"
            href="/recoverpassword"
          >
            <span className="text-sm text-[#1259C3] cursor-pointer hover:underline">
              Forgot password?
            </span>
          </motion.a>

          {/* Login button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ backgroundColor: "#0A4DB8", scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="w-full py-4 rounded-lg bg-[#1259C3] text-white font-bold text-base shadow-md transition-colors mb-8"
            
          >
            Login
          </motion.button>

          {/* Divider "ou" */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            className="flex items-center gap-4 mb-7"
          >
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm font-bold text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </motion.div>

          {/* Google sign-in */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.54 }}
            whileHover={{ backgroundColor: "#f5f5f5", scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-3 w-full py-3 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-medium transition-colors mb-7 shadow-sm"
          >
            {/* Google G logo */}
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Sign in with google
          </motion.button>

          {/* Register link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center text-sm text-gray-700"
          >
            New Angoverso?{" "}
            <span
              className="text-[#1259C3] font-medium cursor-pointer hover:underline"
              onClick={() => router("/cadastro")}
            >
              Create Count
            </span>
          </motion.p>
        </div>
      </div>

      {/* ── RIGHT SIDE — photo with blue overlay ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="w-[42%] flex-shrink-0 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&q=80')`,
          }}
        />
        {/* Blue tint overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(30, 80, 200, 0.42)" }}
        />
      </motion.div>
    </div>
  );
}