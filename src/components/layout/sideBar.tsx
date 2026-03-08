"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function SearchBar() {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <motion.div
      animate={{ width: focused ? 340 : 300 }}
      transition={{ duration: 0.2 }}
      className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white"
      style={{ minWidth: 260 }}
    >
      <div className="pl-3 text-gray-400 text-sm flex-shrink-0">🔍</div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Pesquisa produtos, categorias e serviços"
        className="flex-1 px-2 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400 bg-transparent"
      />
      <button className="px-3 py-2 text-xs text-gray-600 border-l border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors flex-shrink-0 whitespace-nowrap">
        Todas Categorias
      </button>
      <motion.button
        whileHover={{ backgroundColor: "#0052cc" }}
        whileTap={{ scale: 0.97 }}
        className="px-4 py-2 bg-[#1259C3] text-white text-xs font-semibold flex-shrink-0"
      >
        Procurar
      </motion.button>
    </motion.div>
  );
}