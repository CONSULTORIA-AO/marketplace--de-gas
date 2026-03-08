'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRegEyeSlash, LiaEyeSolid } from '@/constants/icons';
import { Button } from '@/components/ui/button';

export function SignUp() {
  const router = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [focused, setFocused] = useState<string | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    // handle registration logic
    router('/');
  };

  const fields = [
    { key: 'fullName', label: 'Full name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    {
      key: 'password',
      label: 'Password',
      type: showPass ? 'text' : 'password',
      toggle: () => setShowPass(!showPass),
      show: showPass,
    },
    {
      key: 'confirmPassword',
      label: 'Confirm password',
      type: showConfirm ? 'text' : 'password',
      toggle: () => setShowConfirm(!showConfirm),
      show: showConfirm,
    },
  ] as const;

  return (
    <div
      className="min-h-screen flex"
      style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
    >
      {/* ── LEFT SIDE ─────────────────────────────────────────────────────── */}
      <div className="flex-[1.1] bg-white flex flex-col relative">
        {/* Form area */}
        <div
          className="flex-1 flex flex-col justify-center px-16 pb-10"
          style={{ maxWidth: 520 }}
        >
          {/* Logo + subtitle */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-black text-[#1259C3] mb-2"
          >
            Angoverso
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-gray-500 text-base mb-10"
          >
            Create Count in Angoverso
          </motion.p>

          {/* Fields */}
          <div className="flex flex-col gap-6">
            {fields.map((field, i) => (
              <motion.div
                key={field.key}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 + i * 0.08 }}
                className="relative"
              >
                <input
                  type={field.type}
                  placeholder={field.label}
                  value={form[field.key]}
                  onChange={(e) => handleChange(field.key, e.target.value)}
                  onFocus={() => setFocused(field.key)}
                  onBlur={() => setFocused(null)}
                  className="w-full pb-2 pt-1 text-sm text-gray-700 placeholder:text-gray-400 bg-transparent outline-none border-b transition-colors"
                  style={{
                    borderBottomColor:
                      focused === field.key ? '#1259C3' : '#C0C0C0',
                    borderBottomWidth: focused === field.key ? 2 : 1,
                  }}
                />
                {/* Show/hide password toggle */}
                {'toggle' in field && (
                  <Button
                    type="button"
                    onClick={field.toggle}
                    className="absolute right-0 hover:cursor-pointer bg-transparent hover:bg-transparent bottom-2 text-gray-400 hover:text-gray-600 text-xs"
                    tabIndex={-1}
                  >
                    {field.show ? <LiaEyeSolid /> : <FaRegEyeSlash />}
                  </Button>
                )}
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-[#1259C3]"
                  animate={{ width: focused === field.key ? '100%' : '0%' }}
                  transition={{ duration: 0.25 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Submit button */}
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            whileHover={{ backgroundColor: '#0A4DB8', scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            className="mt-10 w-full py-4 hover:cursor-pointer rounded-lg bg-[#1259C3] text-white font-bold text-base shadow-md transition-colors"
          >
            Create Count
          </motion.button>

          {/* Login link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="mt-5 text-center text-sm text-gray-700"
          >
            Already have on count?{' '}
            <span
              className="text-[#1259C3] font-medium cursor-pointer hover:underline"
              onClick={() => router('/iniciar-sessao')}
            >
              Acessar conta
            </span>
          </motion.p>
        </div>
      </div>

      {/* ── RIGHT SIDE — blue gradient ────────────────────────────────────── */}
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
          style={{ backgroundColor: 'rgba(30, 80, 200, 0.42)' }}
        />
      </motion.div>
    </div>
  );
}
