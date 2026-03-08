'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Header } from '@/components/layout/header';
import { ProductCard } from '@/components/layout/productCard';
import Feedback from '@/components/layout/feedback';
import { Newsletter } from '@/components/layout/newLetter';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/layout/hero';
import { useProducts } from '@/service/product/product';
import { GasProduct } from '@/types/product';

export default function Home() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const [searchTerm, setSearchTerm] = useState('');

  // Busca os produtos com React Query
  const { data, isLoading, isError, error } = useProducts();

  // Filtra localmente (client-side) com base no searchTerm
  const filteredProducts = (data?.mensagem || []).filter(
    (product: GasProduct) =>
      product.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.unidadeMedida.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F5F5F5] font-sans antialiased">
      <Header onSearch={(term) => setSearchTerm(term)} />

      {/* ── HERO ──*/}
      <Hero />

      {/* ── TRUST BAR ────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border-b border-gray-100 py-3"
      >
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-4 text-sm">
          {[
            { icon: '🛡️', text: 'Compra garantida' },
            { icon: '🚚', text: 'Entrega rápida' },
            { icon: '💳', text: 'Pague em até 12x' },
            { icon: '↩️', text: 'Devolução grátis' },
            { icon: '🔒', text: '100% seguro' },
          ].map((item) => (
            <motion.div
              key={item.text}
              whileHover={{ y: -2 }}
              className="flex items-center gap-2 text-gray-600"
            >
              <span>{item.icon}</span>
              <span className="font-medium">{item.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── PROMO BANNER ─────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              bg: 'from-[#1259C3] to-[#0A3D8F]',
              title: 'Frete grátis',
              sub: 'Em produtos selecionados',
              icon: '🚚',
              cta: 'Ver agora',
            },
            {
              bg: 'from-[#FFA500] to-[#FFD000]',
              title: 'Oferta do dia',
              sub: 'Até 60% de desconto',
              icon: '⚡',
              cta: 'Aproveitar',
              dark: true,
            },
            {
              bg: 'from-[#00A650] to-[#007A3A]',
              title: 'Parcele em 12x',
              sub: 'Sem juros no cartão',
              icon: '💳',
              cta: 'Saiba mais',
            },
          ].map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-gradient-to-br ${b.bg} rounded-2xl p-6 flex items-center justify-between cursor-pointer overflow-hidden relative`}
            >
              <div>
                <p
                  className={`font-black text-xl ${b.dark ? 'text-gray-900' : 'text-white'}`}
                >
                  {b.title}
                </p>
                <p
                  className={`text-sm mt-1 ${b.dark ? 'text-gray-700' : 'text-white/80'}`}
                >
                  {b.sub}
                </p>
              </div>
              <span className="text-5xl opacity-80">{b.icon}</span>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 rounded-full bg-white/10" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-black text-gray-800"
          >
            🔥 Produtos
          </motion.h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array(8)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden animate-pulse h-80"
                />
              ))}
          </div>
        ) : isError ? (
          <div className="text-center py-12 text-red-600">
            Erro ao carregar produtos: {error?.message || 'Tente novamente'}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Nenhum produto encontrado para "{searchTerm}"
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map((product: GasProduct, index: number) => (
              <ProductCard
                key={product.produtoId}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── STATS ────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="bg-gradient-to-br from-[#FFA500] to-[#FFA500] py-16 my-8"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '50M+', label: 'Usuários ativos' },
            { value: '2M+', label: 'Vendedores' },
            { value: 'R$ 80B+', label: 'Em transações' },
            { value: '99.9%', label: 'Satisfação' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="text-white"
            >
              <motion.p
                className="text-4xl font-black"
                initial={{ scale: 0.5 }}
                animate={statsInView ? { scale: 1 } : {}}
                transition={{
                  delay: i * 0.1 + 0.2,
                  type: 'spring',
                  stiffness: 120,
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-white/70 text-sm mt-1 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="clientes">
        <Feedback />
      </section>

      <section className="px-6" id="newsletter">
        <h2 className="text-3xl font-semibold mb-6 text-[#FFA500] text-center">
          Receba Novidades
        </h2>
        <div className="max-w-md mx-auto">
          <Newsletter />
        </div>
      </section>
      {/* ── FOOTER ── */}
      <Footer />
    </div>
  );
}
