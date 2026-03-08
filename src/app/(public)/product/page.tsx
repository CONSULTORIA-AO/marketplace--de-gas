"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FcPhone } from "react-icons/fc";
import { FaWhatsapp } from "react-icons/fa";
import { LuMessageCircle } from "react-icons/lu";
import { Header } from "@/components/layout/header";
import { IMAGES, RELATED } from "@/data/product";
import { Footer } from "@/components/layout/footer";

export default function ProductPage() {
  const [activeImg, setActiveImg] = useState(0);
  const [wished, setWished] = useState(false);
  const [wishList, setWishList] = useState<number[]>([]);
  const [cartDone, setCartDone] = useState(false);
  const [qty, setQty] = useState(1);

  const handleCart = () => {
    setCartDone(true);
    setTimeout(() => setCartDone(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb]" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header />

      {/* Breadcrumb */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="w-full px-4 lg:px-8 py-2.5 flex items-center gap-1.5 text-xs text-gray-500 overflow-x-auto">
          {["Angoverso", "Lojas", "Mobilias", "Conjunto de Lençóis"].map((c, i, arr) => (
            <span key={c} className="flex items-center gap-1.5 flex-shrink-0">
              <a href="#" className={`hover:text-[#1259C3] transition-colors ${i === arr.length - 1 ? "text-gray-900 font-semibold" : ""}`}>{c}</a>
              {i < arr.length - 1 && <span className="text-gray-300">›</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Filter Bar */}
      <div className="w-full bg-white border-b border-gray-100">
        <div className="w-full px-4 lg:px-8 py-3 flex flex-wrap items-end gap-4">
          {[
            { label: "Catégoria", type: "static", value: "Lojas" },
            { label: "Subcatégoria", type: "select", options: ["Imobiliária", "Mobília", "Decoração"] },
            { label: "Loja", type: "select", options: ["BEM ME QUER", "Denny House", "Casa & Co"] },
          ].map(f => (
            <div key={f.label} className="flex flex-col gap-1">
              <label className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">{f.label}</label>
              {f.type === "static" ? (
                <div className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 font-semibold">{f.value}</div>
              ) : (
                <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 outline-none cursor-pointer min-w-[150px] focus:border-[#1259C3] transition-colors">
                  {f.options?.map(o => <option key={o}>{o}</option>)}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Product Content ──────────────────────────────────────────────── */}
      <div className="w-full px-4 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-8">

          {/* LEFT */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-snug mb-1">
                Conjunto de Lençóis de cama de 4 peças em série 1800mm
              </h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className={`w-4 h-4 ${s <= 4 ? "text-yellow-400" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-sm text-gray-500 ml-1">(128 avaliações)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold border border-green-100">Em Stock</span>
              </div>

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-3xl font-black text-[#1259C3]">85.000.00 Kz</span>
                <span className="text-lg text-gray-400 line-through">110.000.00 Kz</span>
                <span className="px-2 py-0.5 rounded bg-red-50 text-red-600 text-sm font-bold">-23%</span>
              </div>
              <div className="flex items-center gap-2 mb-6 text-sm">
                <a href="#" className="text-[#1259C3] font-semibold hover:underline">Loja</a>
                <span className="text-gray-300">•</span>
                <span className="text-gray-600 font-medium">BEM ME QUER</span>
              </div>

              {/* Gallery */}
              <div className="flex gap-4">
                {/* Thumbs */}
                <div className="flex flex-col gap-2 flex-shrink-0">
                  {IMAGES.map((img, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setActiveImg(i)}
                      className="w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0"
                      style={{ borderColor: activeImg === i ? "#1259C3" : "#e5e7eb" }}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>

                {/* Main */}
                <div className="flex-1 relative rounded-2xl overflow-hidden bg-gray-50" style={{ minHeight: 380 }}>
                  <AnimatePresence mode="wait">
                    <motion.img key={activeImg}
                      src={IMAGES[activeImg]} alt="Produto"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-full object-cover absolute inset-0"
                      style={{ minHeight: 380 }}
                    />
                  </AnimatePresence>

                  {/* Wish */}
                  <motion.button whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.9 }}
                    onClick={() => setWished(!wished)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-100 z-10">
                    <svg className={`w-5 h-5 ${wished ? "text-red-500 fill-red-500" : "text-gray-400"}`} fill={wished ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"/>
                    </svg>
                  </motion.button>

                  {/* Arrows */}
                  {[
                    { dir: "left", icon: "‹", fn: () => setActiveImg(p => (p - 1 + IMAGES.length) % IMAGES.length) },
                    { dir: "right", icon: "›", fn: () => setActiveImg(p => (p + 1) % IMAGES.length) },
                  ].map(a => (
                    <button key={a.dir} onClick={a.fn}
                      className={`absolute ${a.dir === "left" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 shadow rounded-full text-gray-700 font-bold text-xl flex items-center justify-center hover:bg-white transition-colors z-10`}>
                      {a.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-base font-bold text-gray-900 mb-3">Descrição</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Conjunto de lençóis de cama de alta qualidade em série 1800mm. Feito com tecido premium de microfibra ultramacia que proporciona conforto incomparável durante o sono. Resistente a rugas, desbotamento e encolhimento. Inclui lençol de baixo com elástico, lençol de cima e 2 fronhas. Disponível em múltiplas cores para combinar com a decoração do seu quarto.
                </p>
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Material", value: "Microfibra 1800mm" },
                    { label: "Tamanho", value: "Casal / Queen" },
                    { label: "Peças", value: "4 unidades" },
                    { label: "Garantia", value: "1 ano" },
                  ].map(spec => (
                    <div key={spec.label} className="bg-blue-50 rounded-xl p-3 border border-blue-100">
                      <p className="text-xs text-blue-400 font-medium mb-0.5">{spec.label}</p>
                      <p className="text-sm text-blue-900 font-bold">{spec.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Qty + Buttons */}
              <div className="mt-7 flex flex-wrap items-center gap-4">
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">−</button>
                  <span className="px-5 py-3 text-sm font-bold text-gray-800 border-x border-gray-200 min-w-[48px] text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)}
                    className="px-4 py-3 text-gray-500 hover:bg-gray-50 font-bold text-lg transition-colors">+</button>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-[#1259C3] text-white font-bold text-sm shadow-md hover:bg-[#0A3D8F] transition-colors">
                  Compre agora
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handleCart}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-[#1259C3] text-[#1259C3] font-bold text-sm hover:bg-blue-50 transition-colors">
                  {cartDone ? "✓ Adicionado!" : "Adicionar no Carrinho"}
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">
                  Ver o Carrinho
                </motion.button>
              </div>
            </div>
          </div>

          {/* RIGHT — Seller */}
          <div className="w-full xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 xl:sticky xl:top-28">
              {/* Seller avatar */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100 mb-3 border-4 border-blue-50">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
                    alt="Vendedor" className="w-full h-full object-cover" />
                </div>
                <p className="font-black text-gray-900 text-base">BEM ME QUER</p>
                <p className="text-xs text-gray-400 mt-1">Utilizador desde 22/09/2023</p>
                <div className="mt-2 flex items-center gap-1">
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">5.0</span>
                </div>
                <span className="mt-2 px-3 py-1 rounded-full bg-blue-50 text-[#1259C3] text-xs font-bold border border-blue-100">
                  Catégoria: Vendedor
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mb-5 text-center">
                {[{ v: "247", l: "Vendas" }, { v: "4.9★", l: "Rating" }, { v: "2 anos", l: "Activo" }].map(s => (
                  <div key={s.l} className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                    <p className="text-sm font-black text-gray-900">{s.v}</p>
                    <p className="text-[10px] text-gray-500">{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-2.5">
                {[
                  { label: "+244 934 444 555", icon: <FcPhone />, primary: true },
                  { label: "Whatsapp", icon: <FaWhatsapp />, primary: true },
                  { label: "Enviar mensagem", icon: <LuMessageCircle />, primary: true },
                  { label: "Avaliar o Vendedor", icon: "⭐", primary: true },
                  { label: "Ver página", icon: "🔗", primary: true },
                ].map((btn, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="w-full py-2.5 rounded-xl bg-[#1259C3] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#0A3D8F] transition-colors shadow-sm">
                    <span>{btn.icon}</span>
                    <span>{btn.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Related Products ────────────────────────────────────────────── */}
        <div className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Explorar itens relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {RELATED.map((p, i) => (
              <motion.div key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -5, boxShadow: "0 16px 40px rgba(18,89,195,0.12)" }}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 cursor-pointer transition-all group"
                style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                {/* Image */}
                <div className="relative overflow-hidden" style={{ height: 160 }}>
                  <img src={p.img} alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <button
                    onClick={() => setWishList(prev => prev.includes(p.id) ? prev.filter(x => x !== p.id) : [...prev, p.id])}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center hover:bg-white transition-colors">
                    <svg className={`w-4 h-4 ${wishList.includes(p.id) ? "text-red-500 fill-red-500" : "text-gray-400"}`}
                      fill={wishList.includes(p.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 0 0 0 6.364L12 20.364l7.682-7.682a4.5 4.5 0 0 0-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 0 0-6.364 0z"/>
                    </svg>
                  </button>
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-xs text-[#1259C3] font-semibold">Loja</span>
                    <span className="text-gray-300 text-xs">•</span>
                    <span className="text-xs text-gray-500 truncate">{p.seller}</span>
                  </div>
                  <p className="text-xs text-gray-800 font-medium leading-snug mb-2 line-clamp-2">{p.name}</p>
                  <p className="text-sm font-black text-[#1259C3]">{p.price}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}