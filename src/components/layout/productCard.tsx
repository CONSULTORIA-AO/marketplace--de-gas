"use client";
import { Product } from "@/types/product";
import { useState } from "react";
import { motion } from "framer-motion";

export function ProductCard({ product, index }: { product: Product; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer group"
      style={{ boxShadow: hovered ? "0 20px 60px rgba(18,89,195,0.15)" : "0 2px 12px rgba(0,0,0,0.06)" }}
    >

      <motion.img
        className="h-44 w-full flex items-center justify-center text-7xl bg-gradient-to-br from-blue-50 to-indigo-50"
        animate={{ scale: hovered ? 1.08 : 1 }}
        transition={{ duration: 0.3 }}
        src={product.img}
      />

      <div className="p-4 space-y-2">
        <p className="text-gray-800 font-medium text-sm leading-snug line-clamp-2">{product.name}</p>

        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-gray-900">{product.price}</span>
        </div>

          <div className="flex">
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-2 py-2 rounded-lg bg-transparent border text-sm font-semibold transition-colors text-[#FFA500]"
            >
              Adicionar +
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full mt-2 py-2 rounded-lg bg-[#FFA500] text-white text-sm font-semibold hover:bg-[#FFA500] transition-colors"
            >
             Comprar
            </motion.button>  
          </div>      
        </div>
    </motion.div>
  );
}
