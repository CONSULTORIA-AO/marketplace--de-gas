'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { Navigate, useNavigate } from 'react-router-dom';
import { useUserStore } from '@/hooks/customer';
import { useCartStore, type CartItem } from '@/hooks/cartstore';
import { api } from '@/utils/api';
import { useAuthStore } from '@/hooks/auth';
import { AuthHeader } from '@/components/header';
import { View } from '@/types/customer';
import { GasProduct } from '@/types/product';
import { Sidebar } from '../../components/sidebar';

// ─── Constants ────────────────────────────────────────────────────────────────
const ORANJE = '#FFA500';

const SHIPPING_OPTIONS = [
  {
    id: 'fixed',
    label: 'Taxa fixa',
    days: '2 dias',
    price: 10,
    priceLabel: 'KZ 10,00',
  },
  {
    id: 'sameday',
    label: 'Entrega no mesmo dia',
    days: '1 dia',
    price: 22,
    priceLabel: 'KZ 22,00',
  },
  {
    id: 'pickup',
    label: 'Retirada no local',
    days: '--',
    price: 0,
    priceLabel: 'KZ 0,00',
  },
  {
    id: 'ups',
    label: 'UPS Ground',
    days: '2 a 5 dias',
    price: 16,
    priceLabel: 'Kz 16,00',
  },
];

const PAYMENT_METHODS = [
  {
    id: 'multicaixa',
    label: 'Multicaixa Express',
    desc: 'Pague pelo telemóvel via Multicaixa Express',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ORANJE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 'referencia',
    label: 'Pagar por Referência',
    desc: 'Gere uma referência e pague em qualquer caixa',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ORANJE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <line x1="2" y1="10" x2="22" y2="10" />
      </svg>
    ),
  },
  {
    id: 'iban',
    label: 'Transferência por IBAN',
    desc: 'Transfira diretamente da sua conta bancária',
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke={ORANJE}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
];

// ─── Step indicator ────────────────────────────────────────────────────────────
const STEPS = ['Carrinho', 'Envio', 'Pagamento', 'Revisão'];

function Stepper({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8 px-2">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: done || active ? ORANJE : '#E5E7EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 0.3s',
                  border: active ? `3px solid #e08e00` : 'none',
                }}
              >
                {done ? (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: active ? 'white' : '#9CA3AF',
                    }}
                  >
                    {i + 1}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 11,
                  marginTop: 4,
                  fontWeight: active ? 700 : 400,
                  color: active ? ORANJE : done ? '#374151' : '#9CA3AF',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  background: done ? ORANJE : '#E5E7EB',
                  margin: '0 4px',
                  marginBottom: 20,
                  transition: 'background 0.3s',
                  flexShrink: 0,
                }}
                className="hidden xs:block sm:w-16 md:w-24"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Shared card wrapper ───────────────────────────────────────────────────────
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
        border: '1px solid #F3F4F6',
        padding: '28px 24px',
      }}
    >
      {children}
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 18,
        fontWeight: 800,
        color: '#111827',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: 4,
          height: 20,
          background: ORANJE,
          borderRadius: 4,
        }}
      />
      {children}
    </h2>
  );
}

// ─── Step 1: Cart items ────────────────────────────────────────────────────────
function CartStep({
  items,
  updateQuantity,
  removeItem,
  getTotal,
  onNext,
}: {
  items: CartItem[];
  updateQuantity: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  getTotal: () => number;
  onNext: () => void;
}) {
  const total = getTotal();

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <SectionTitle>O seu carrinho</SectionTitle>

        {items.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D1D5DB"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ margin: '0 auto 12px', display: 'block' }}
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-8 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <p style={{ color: '#9CA3AF', fontSize: 14, margin: 0 }}>
              O seu carrinho está vazio.
            </p>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map((item, i) => {
            const subtotal = item.product.preco * item.quantity;
            return (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 16px',
                  background: '#FAFAFA',
                  borderRadius: 12,
                  border: '1px solid #F3F4F6',
                }}
              >
                {/* Product image */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 10,
                    background: '#FFF3E0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  {item.product.imagem_produto ? (
                    <img
                      src={item.product.imagem_produto}
                      alt={item.product.descricao}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  ) : (
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={ORANJE}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#111827',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.product.descricao}
                  </p>
                  <p
                    style={{
                      margin: '3px 0 0',
                      fontSize: 12,
                      color: '#6B7280',
                    }}
                  >
                    KZ{' '}
                    {item.product.preco.toLocaleString('pt-AO', {
                      minimumFractionDigits: 2,
                    })}{' '}
                    / {item.product.unidadeMedida}
                  </p>
                  {/* Quantity control */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      marginTop: 8,
                    }}
                  >
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        border: '1.5px solid #E5E7EB',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#374151',
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        minWidth: 20,
                        textAlign: 'center',
                        fontWeight: 700,
                        fontSize: 13,
                        color: '#111827',
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: 6,
                        border: '1.5px solid #E5E7EB',
                        background: 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 700,
                        color: '#374151',
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal + remove */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: 8,
                    flexShrink: 0,
                  }}
                >
                  <span
                    style={{ fontWeight: 800, fontSize: 14, color: ORANJE }}
                  >
                    KZ{' '}
                    {subtotal.toLocaleString('pt-AO', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                  <button
                    onClick={() => removeItem(item.productId)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: '#EF4444',
                      padding: 0,
                    }}
                    title="Remover"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Total */}
        <div
          style={{
            marginTop: 20,
            paddingTop: 16,
            borderTop: '2px dashed #F3F4F6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 600, color: '#374151' }}>
            Total do carrinho
          </span>
          <span style={{ fontSize: 20, fontWeight: 900, color: ORANJE }}>
            KZ {total.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={items.length === 0}
          style={{
            marginTop: 24,
            width: '100%',
            padding: '14px 0',
            background: items.length > 0 ? ORANJE : '#E5E7EB',
            color: items.length > 0 ? 'white' : '#9CA3AF',
            border: 'none',
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 800,
            cursor: items.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => {
            if (items.length > 0) e.currentTarget.style.background = '#e08e00';
          }}
          onMouseLeave={(e) => {
            if (items.length > 0) e.currentTarget.style.background = ORANJE;
          }}
        >
          Fazer compra →
        </button>
      </Card>
    </motion.div>
  );
}

// ─── Step 2: Shipping ──────────────────────────────────────────────────────────
function ShippingStep({
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  selected: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <SectionTitle>Método de envio</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SHIPPING_OPTIONS.map((opt, i) => {
            const isSelected = selected === opt.id;
            return (
              <motion.button
                key={opt.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onSelect(opt.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: 12,
                  border: `2px solid ${isSelected ? ORANJE : '#E5E7EB'}`,
                  background: isSelected ? '#FFF8EE' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      border: `2px solid ${isSelected ? ORANJE : '#D1D5DB'}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {isSelected && (
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: '50%',
                          background: ORANJE,
                        }}
                      />
                    )}
                  </div>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 14,
                        color: '#111827',
                      }}
                    >
                      {opt.label}
                    </p>
                    <p
                      style={{
                        margin: '2px 0 0',
                        fontSize: 12,
                        color: '#6B7280',
                      }}
                    >
                      Prazo: {opt.days}
                    </p>
                  </div>
                </div>
                <span
                  style={{
                    fontWeight: 800,
                    fontSize: 15,
                    color: isSelected ? ORANJE : '#374151',
                    flexShrink: 0,
                  }}
                >
                  {opt.priceLabel}
                </span>
              </motion.button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '13px 0',
              background: 'white',
              color: '#374151',
              border: '2px solid #E5E7EB',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ← Voltar
          </button>
          <button
            onClick={onNext}
            disabled={!selected}
            style={{
              flex: 2,
              padding: '13px 0',
              background: selected ? ORANJE : '#E5E7EB',
              color: selected ? 'white' : '#9CA3AF',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 800,
              cursor: selected ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (selected) e.currentTarget.style.background = '#e08e00';
            }}
            onMouseLeave={(e) => {
              if (selected) e.currentTarget.style.background = ORANJE;
            }}
          >
            Prosseguir →
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Step 3: Payment ───────────────────────────────────────────────────────────
function PaymentStep({
  selected,
  onSelect,
  onBack,
  onNext,
}: {
  selected: string;
  onSelect: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <SectionTitle>Método de pagamento</SectionTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PAYMENT_METHODS.map((method, i) => {
            const isSelected = selected === method.id;
            return (
              <motion.button
                key={method.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => onSelect(method.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 18px',
                  borderRadius: 12,
                  border: `2px solid ${isSelected ? ORANJE : '#E5E7EB'}`,
                  background: isSelected ? '#FFF8EE' : 'white',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  width: '100%',
                  textAlign: 'left',
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: isSelected ? '#FFF3E0' : '#F9FAFB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {method.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#111827',
                    }}
                  >
                    {method.label}
                  </p>
                  <p
                    style={{
                      margin: '3px 0 0',
                      fontSize: 12,
                      color: '#6B7280',
                    }}
                  >
                    {method.desc}
                  </p>
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    border: `2px solid ${isSelected ? ORANJE : '#D1D5DB'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {isSelected && (
                    <div
                      style={{
                        width: 11,
                        height: 11,
                        borderRadius: '50%',
                        background: ORANJE,
                      }}
                    />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1,
              padding: '13px 0',
              background: 'white',
              color: '#374151',
              border: '2px solid #E5E7EB',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            ← Voltar
          </button>
          <button
            onClick={onNext}
            disabled={!selected}
            style={{
              flex: 2,
              padding: '13px 0',
              background: selected ? ORANJE : '#E5E7EB',
              color: selected ? 'white' : '#9CA3AF',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 800,
              cursor: selected ? 'pointer' : 'not-allowed',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (selected) e.currentTarget.style.background = '#e08e00';
            }}
            onMouseLeave={(e) => {
              if (selected) e.currentTarget.style.background = ORANJE;
            }}
          >
            Prosseguir →
          </button>
        </div>
      </Card>
    </motion.div>
  );
}

// ─── Step 4: Review ────────────────────────────────────────────────────────────
function ReviewStep({
  items,
  shippingId,
  paymentId,
  isSubmitting,
  onBack,
  onEdit,
  onFinish,
}: {
  items: CartItem[];
  shippingId: string;
  paymentId: string;
  isSubmitting: boolean;
  onBack: () => void;
  onEdit: (step: number) => void;
  onFinish: () => void;
}) {
  const shipping = SHIPPING_OPTIONS.find((s) => s.id === shippingId);
  const payment = PAYMENT_METHODS.find((p) => p.id === paymentId);
  const cartTotal = items.reduce(
    (sum, i) => sum + i.product.preco * i.quantity,
    0
  );
  const grandTotal = cartTotal + (shipping?.price ?? 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.25 }}
    >
      <Card>
        <SectionTitle>Revisão do pedido</SectionTitle>

        {/* Cart items summary */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Produtos
            </span>
            <button
              onClick={() => onEdit(0)}
              style={{
                fontSize: 12,
                color: ORANJE,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Editar
            </button>
          </div>
          {items.map((item) => (
            <div
              key={item.productId}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #F9FAFB',
              }}
            >
              <span
                style={{
                  fontSize: 13,
                  color: '#374151',
                  flex: 1,
                  marginRight: 12,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.product.descricao} × {item.quantity}
              </span>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: '#111827',
                  flexShrink: 0,
                }}
              >
                KZ{' '}
                {(item.product.preco * item.quantity).toLocaleString('pt-AO', {
                  minimumFractionDigits: 2,
                })}
              </span>
            </div>
          ))}
        </div>

        {/* Shipping summary */}
        <div
          style={{
            marginBottom: 20,
            padding: '14px 16px',
            background: '#FAFAFA',
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Envio
            </span>
            <button
              onClick={() => onEdit(1)}
              style={{
                fontSize: 12,
                color: ORANJE,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Editar
            </button>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#111827',
                }}
              >
                {shipping?.label}
              </p>
              <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6B7280' }}>
                Prazo: {shipping?.days}
              </p>
            </div>
            <span style={{ fontWeight: 800, fontSize: 15, color: ORANJE }}>
              {shipping?.priceLabel}
            </span>
          </div>
        </div>

        {/* Payment summary */}
        <div
          style={{
            marginBottom: 24,
            padding: '14px 16px',
            background: '#FAFAFA',
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: '#6B7280',
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Pagamento
            </span>
            <button
              onClick={() => onEdit(2)}
              style={{
                fontSize: 12,
                color: ORANJE,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              Editar
            </button>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 600,
              color: '#111827',
            }}
          >
            {payment?.label}
          </p>
          <p style={{ margin: '2px 0 0', fontSize: 12, color: '#6B7280' }}>
            {payment?.desc}
          </p>
        </div>

        {/* Grand total */}
        <div
          style={{
            padding: '16px 20px',
            background: '#FFF8EE',
            borderRadius: 12,
            border: `1.5px solid ${ORANJE}20`,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 6,
            }}
          >
            <span style={{ fontSize: 13, color: '#6B7280' }}>Subtotal</span>
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>
              KZ{' '}
              {cartTotal.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <span style={{ fontSize: 13, color: '#6B7280' }}>Envio</span>
            <span style={{ fontSize: 13, color: '#374151', fontWeight: 600 }}>
              {shipping?.priceLabel}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              paddingTop: 12,
              borderTop: '1.5px dashed #FFA50040',
            }}
          >
            <span style={{ fontSize: 16, fontWeight: 800, color: '#111827' }}>
              Total
            </span>
            <span style={{ fontSize: 22, fontWeight: 900, color: ORANJE }}>
              KZ{' '}
              {grandTotal.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onBack}
            disabled={isSubmitting}
            style={{
              flex: 1,
              padding: '13px 0',
              background: 'white',
              color: '#374151',
              border: '2px solid #E5E7EB',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.6 : 1,
            }}
          >
            ← Voltar
          </button>
          <button
            onClick={onFinish}
            disabled={isSubmitting}
            style={{
              flex: 2,
              padding: '13px 0',
              background: ORANJE,
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 800,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              opacity: isSubmitting ? 0.75 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              if (!isSubmitting) e.currentTarget.style.background = '#e08e00';
            }}
            onMouseLeave={(e) => {
              if (!isSubmitting) e.currentTarget.style.background = ORANJE;
            }}
          >
            {isSubmitting ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ animation: 'spin 1s linear infinite' }}
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
                A processar...
              </>
            ) : (
              'Finalizar compra ✓'
            )}
          </button>
        </div>
      </Card>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}

// ─── Confirmation screen ───────────────────────────────────────────────────────
function ConfirmationScreen({ onGoHome }: { onGoHome: () => void }) {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        minHeight: '82vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div
        style={{
          background: 'white',
          borderRadius: 24,
          boxShadow: '0 8px 48px rgba(255,165,0,0.15)',
          border: `2px solid ${ORANJE}20`,
          padding: '56px 40px',
          maxWidth: 560,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          style={{
            width: 90,
            height: 90,
            borderRadius: '50%',
            background: '#FFF8EE',
            border: `3px solid ${ORANJE}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px',
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke={ORANJE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            fontSize: 26,
            fontWeight: 900,
            color: '#111827',
            marginBottom: 12,
          }}
        >
          Pedido confirmado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{
            fontSize: 15,
            color: '#6B7280',
            lineHeight: 1.6,
            marginBottom: 32,
          }}
        >
          O seu pedido foi registado com sucesso e está a aguardar aprovação.
        </motion.p>

        {/* Payment on delivery notice */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{
            background: '#FFF8EE',
            border: `1.5px solid ${ORANJE}40`,
            borderRadius: 14,
            padding: '22px 24px',
            marginBottom: 32,
            display: 'flex',
            alignItems: 'flex-start',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: 12,
              background: '#FFF3E0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke={ORANJE}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
          </div>
          <div>
            <p
              style={{
                margin: 0,
                fontWeight: 800,
                fontSize: 15,
                color: '#111827',
              }}
            >
              Pagamento na entrega
            </p>
            <p
              style={{
                margin: '6px 0 0',
                fontSize: 13,
                color: '#6B7280',
                lineHeight: 1.55,
              }}
            >
              O pagamento será efectuado no momento da entrega do produto.
              Certifique-se de ter o valor exacto disponível quando o entregador
              chegar.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
          <button
            onClick={() => navigate('/produtos')}
            style={{
              width: '100%',
              padding: '14px 0',
              background: ORANJE,
              color: 'white',
              border: 'none',
              borderRadius: 10,
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#e08e00')}
            onMouseLeave={(e) => (e.currentTarget.style.background = ORANJE)}
          >
            Voltar à loja
          </button>
          <button
            onClick={() => {}}
            style={{
              width: '100%',
              padding: '13px 0',
              background: 'white',
              color: '#374151',
              border: '2px solid #E5E7EB',
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            Ver os meus pedidos
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Main CheckoutPage ─────────────────────────────────────────────────────────
export function CheckoutPage() {
  const navigate = useNavigate();
  const cliente = useUserStore((state) => state.cliente);
  const clienteId = useAuthStore((state) => state.session.user.id);
  const [view, setView] = useState<View>('produtos');
  const [favorites, setFavorites] = useState<GasProduct[]>([]);
  const [search, setSearch] = useState<string>('');
  const [sidebarOpen, setSidebar] = useState<boolean>(false);

  // Cart store — source of truth for step 1
  const { items, updateQuantity, removeItem, getTotal, clearCart } =
    useCartStore();

  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');

  // POST /v1/pedidos
  const { mutate: submitOrder, isPending: isSubmitting } = useMutation({
    mutationFn: async () => {
      const payload = {
        clienteIdPedido: clienteId,
        itens: items.map((item) => ({
          produto_id: item.product.produtoId,
          quantidade: item.quantity,
        })),
      };
      const response = await api.post('/pedidos', payload);
      return response.data;
    },
    onSuccess: () => {
      clearCart();
      setDone(true);
    },
    onError: (error) => {
      console.error('Erro ao criar pedido:', error);
    },
  });

  if (done) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#F9FAFB',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        <ConfirmationScreen onGoHome={() => navigate('/produtos')} />
      </div>
    );
  }

  return (
    <div>
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 400, display: 'flex' }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(0,0,0,0.4)',
            }}
            onClick={() => setSidebar(false)}
          />
          <Sidebar
            favorites={favorites.length}
            close={() => setSidebar(false)}
            currentView={view}
          />
        </div>
      )}

      <AuthHeader
        search={search}
        setSearch={setSearch}
        //cartCount={cartCount}
        favCount={favorites.length}
        onMenu={() => setSidebar(true)}
      />
      <div
        style={{
          minHeight: '100vh',
          background: '#F9FAFB',
          fontFamily: "'Segoe UI', system-ui, sans-serif",
        }}
      >
        {/* Page header */}
        <div
          style={{
            background: 'white',
            borderBottom: '1px solid #E5E7EB',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <button
            onClick={() => (step === 0 ? navigate(-1) : setStep((s) => s - 1))}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              color: '#6B7280',
              fontSize: 14,
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="hidden sm:inline">Voltar</span>
          </button>
          <span style={{ fontSize: 18, fontWeight: 900, color: ORANJE }}>
            JaGás
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              color: '#111827',
              marginLeft: 4,
            }}
          >
            — Checkout
          </span>
        </div>

        {/* Main content */}
        <div
          style={{ maxWidth: 640, margin: '0 auto', padding: '32px 16px 60px' }}
        >
          <Stepper current={step} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <CartStep
                key="cart"
                items={items}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
                getTotal={getTotal}
                onNext={() => setStep(1)}
              />
            )}
            {step === 1 && (
              <ShippingStep
                key="shipping"
                selected={selectedShipping}
                onSelect={setSelectedShipping}
                onBack={() => setStep(0)}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <PaymentStep
                key="payment"
                selected={selectedPayment}
                onSelect={setSelectedPayment}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <ReviewStep
                key="review"
                items={items}
                shippingId={selectedShipping}
                paymentId={selectedPayment}
                isSubmitting={isSubmitting}
                onBack={() => setStep(2)}
                onEdit={(s) => setStep(s)}
                onFinish={() => submitOrder()}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
