import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useCartStore } from '@/store/cartstore';
import { GasProduct } from '@/types';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

interface Props {
  product: GasProduct;
}

export function ProductInfo({ product }: Props) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
      {/* ── LEFT COLUMN: image gallery ── */}
      <motion.div
        className="lg:col-span-7 flex flex-col gap-5"
        initial="hidden"
        animate="visible"
        custom={0}
      >
        {/* Main image */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1.5px solid rgba(249,115,22,0.45)',
            boxShadow:
              '0 0 60px rgba(249,115,22,0.08), 0 20px 60px rgba(0,0,0,0.6)',
          }}
        >
          {/* Glow corner accent */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 160,
              height: 160,
              background:
                'radial-gradient(circle at top left, rgba(249,115,22,0.18), transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <img
            className="w-full aspect-[4/3] object-contain rounded-3xl"
            src={product.imagem_produto}
            alt={product.descricao}
            style={{ display: 'block' }}
          />
          {/* Stock badge */}
          <span
            className="absolute top-4 right-4 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{
              background: 'rgba(0,0,0,0.7)',
              border: '1px solid rgba(249,115,22,0.5)',
              color: '#f97316',
              backdropFilter: 'blur(8px)',
            }}
          >
            Em Estoque
          </span>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              onClick={() => setActiveThumb(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="aspect-square rounded-2xl overflow-hidden cursor-pointer"
              style={{
                border:
                  activeThumb === i
                    ? '2px solid #f97316'
                    : '1.5px solid rgba(249,115,22,0.2)',
                boxShadow:
                  activeThumb === i ? '0 0 18px rgba(249,115,22,0.3)' : 'none',
                background: 'rgba(255,255,255,0.02)',
                transition: 'border 0.2s, box-shadow 0.2s',
              }}
            >
              <img
                className="w-full h-full object-cover"
                src={product.imagem_produto}
                alt=""
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT COLUMN: info + actions ── */}
      <div className="lg:col-span-5 flex flex-col gap-7">
        {/* Title block */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={1}
          className="space-y-3"
        >
          <p
            className="text-xs font-bold uppercase tracking-[0.2em]"
            style={{ color: 'rgba(249,115,22,0.75)' }}
          >
            Gás de Cozinha · {product.empresaDona}
          </p>
          <h1
            className="text-3xl sm:text-4xl font-extrabold leading-tight"
            style={{ color: '#ffffff', letterSpacing: '-0.02em' }}
          >
            {product.descricao}
          </h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Vendido por{' '}
            <Link
              to="#"
              className="font-bold hover:underline"
              style={{ color: '#f97316' }}
            >
              {product.empresaDona}
            </Link>
          </p>
        </motion.div>

        {/* Price card */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={2}
          className="rounded-3xl p-7 space-y-6"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1.5px solid rgba(249,115,22,0.35)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
          }}
        >
          {/* Price */}
          <div className="space-y-1">
            <p
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.4)' }}
            >
              Preço unitário
            </p>
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl sm:text-5xl font-black"
                style={{ color: '#ffffff', letterSpacing: '-0.03em' }}
              >
                KZ
              </span>
              <span
                className="text-4xl sm:text-5xl font-black"
                style={{ color: '#f97316', letterSpacing: '-0.03em' }}
              >
                {product.preco.toFixed(2)}
              </span>
            </div>
            {/* Stock indicator */}
            <div
              className="flex items-center gap-2 mt-2"
              style={{ color: '#4ade80' }}
            >
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Em estoque · Entrega imediata
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(249,115,22,0.15)' }} />

          {/* Quantity */}
          <div className="space-y-3">
            <Label
              htmlFor="quantity"
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Quantidade
            </Label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1.5px solid rgba(249,115,22,0.35)',
                  color: '#f97316',
                }}
              >
                −
              </button>
              <span
                className="w-14 text-center text-2xl font-black"
                style={{ color: '#ffffff' }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(4, quantity + 1))}
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all"
                style={{
                  background: 'rgba(249,115,22,0.1)',
                  border: '1.5px solid rgba(249,115,22,0.35)',
                  color: '#f97316',
                }}
              >
                +
              </button>
              <span
                className="text-sm ml-2"
                style={{ color: 'rgba(255,255,255,0.35)' }}
              >
                máx. 4 un.
              </span>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'rgba(249,115,22,0.15)' }} />

          {/* Total preview */}
          <div className="flex items-center justify-between">
            <span
              className="text-sm font-semibold"
              style={{ color: 'rgba(255,255,255,0.45)' }}
            >
              Total estimado
            </span>
            <span className="text-xl font-black" style={{ color: '#ffffff' }}>
              KZ {(product.preco * quantity).toFixed(2)}
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 pt-1">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                addItem(product, quantity);
                navigate('/checkout');
              }}
              className="w-full h-14 rounded-2xl text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: '#ffffff',
                boxShadow: '0 8px 24px rgba(249,115,22,0.35)',
                border: 'none',
              }}
            >
              <span className="material-symbols-outlined text-xl">bolt</span>
              Comprar Agora
            </motion.button>

            <button
              onClick={() => navigate(`avaliacao/${product.produtoId}`)}
              className="bg-[#f97316] hover:bg-[#ea580c] text-white cursor-pointer"
            >
              Valiar
            </button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                addItem(product, quantity);
                toast({
                  variant: 'destructive',
                  title: 'Produto adicionado ao carrinho 🛒',
                  description: 'Deseja ir para o carrinho?',
                  action: (
                    <Button
                      variant="secondary"
                      onClick={() => navigate('/carrinho')}
                    >
                      Ver Carrinho
                    </Button>
                  ),
                });
              }}
              className="w-full h-14 rounded-2xl text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              style={{
                background: 'transparent',
                color: '#ffffff',
                border: '1.5px solid rgba(249,115,22,0.5)',
                boxShadow: 'inset 0 0 0 0 rgba(249,115,22,0)',
              }}
            >
              <span className="material-symbols-outlined text-xl">
                shopping_cart
              </span>
              Adicionar ao Carrinho
            </motion.button>
          </div>
        </motion.div>

        {/* Delivery info */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={3}
          className="rounded-2xl p-5 flex items-start gap-4"
          style={{
            background: 'rgba(249,115,22,0.06)',
            border: '1px solid rgba(249,115,22,0.2)',
          }}
        >
          <span
            className="material-symbols-outlined text-2xl mt-0.5 flex-shrink-0"
            style={{ color: '#f97316' }}
          >
            local_shipping
          </span>
          <div>
            <p className="font-bold text-sm" style={{ color: '#ffffff' }}>
              Entrega Ultra-Rápida
            </p>
            <p
              className="text-sm mt-0.5"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              Chega em sua casa entre{' '}
              <strong style={{ color: 'rgba(255,255,255,0.85)' }}>
                30–45 minutos
              </strong>{' '}
              após o pedido.
            </p>
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial="hidden"
          animate="visible"
          custom={4}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { icon: 'verified', label: 'Produto Certificado' },
            { icon: 'lock', label: 'Pagamento Seguro' },
            { icon: 'replay', label: 'Suporte 24h' },
          ].map(({ icon, label }) => (
            <div
              key={icon}
              className="flex flex-col items-center gap-2 py-4 rounded-2xl text-center"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(249,115,22,0.15)',
              }}
            >
              <span
                className="material-symbols-outlined text-xl"
                style={{ color: '#f97316' }}
              >
                {icon}
              </span>
              <span
                className="text-xs font-semibold leading-tight"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
