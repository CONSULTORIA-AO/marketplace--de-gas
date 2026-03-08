'use client';

import { ORANJE, WHITE } from '@/constants/costumer';
import { Icon } from './icon';
import { PaymentForm, PaymentMethod, PaymentViewProps } from '@/types/customer';
import { useState } from 'react';
import { Field } from './field';
import { fmt } from '@/data/customer';

export function PaymentView({ item, onSuccess, onBack }: PaymentViewProps) {
  const [method, setMethod] = useState<string>('multicaixa');
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<PaymentForm>({
    phone: '',
    ref: '',
    card: '',
    expiry: '',
    cvv: '',
    name: '',
    iban: '',
  });

  const methods: PaymentMethod[] = [
    {
      id: 'multicaixa',
      label: 'Multicaixa Express',
      desc: 'Pagamento via Multicaixa',
      icon: 'mobile',
      color: '#E63946',
    },
    {
      id: 'ekwanza',
      label: 'e.Kwanza',
      desc: 'Carteira electrónica BNA',
      icon: 'mobile',
      color: '#F59E0B',
    },
    {
      id: 'unitel_money',
      label: 'Unitel Money',
      desc: 'Transferência Unitel',
      icon: 'phone',
      color: '#EF4444',
    },
    {
      id: 'transferwise',
      label: 'Transferência Bancária',
      desc: 'TPA / Ref. Bancária Angola',
      icon: 'bank',
      color: '#2563EB',
    },
    {
      id: 'visa',
      label: 'Cartão Visa / Mastercard',
      desc: 'Cartão internacional',
      icon: 'credit',
      color: '#1D4ED8',
    },
  ];

  if (step === 4)
    return (
      <div
        className="fade-in"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 400,
          textAlign: 'center',
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#D1FAE5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
          }}
        >
          <Icon name="check" size={36} color="#059669" />
        </div>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 800,
            color: '#111',
            marginBottom: 8,
          }}
        >
          Pagamento Efectuado!
        </h2>
        <p style={{ color: '#6B7280', marginBottom: 24 }}>
          O seu pedido foi confirmado com sucesso.
        </p>
        <button
          onClick={onSuccess}
          style={{
            padding: '12px 32px',
            borderRadius: 10,
            background: ORANJE,
            border: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
          }}
        >
          Ver Meus Pedidos
        </button>
      </div>
    );

  return (
    <div className="fade-in" style={{ maxWidth: 620, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={step > 1 ? () => setStep((s) => s - 1) : onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Icon name="back" color={ORANJE} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Pagamento</h2>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          marginBottom: 24,
        }}
      >
        {['Método', 'Detalhes', 'Confirmar'].map((s, i) => (
          <div
            key={s}
            style={{ display: 'flex', alignItems: 'center', flex: 1 }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background:
                    step > i ? ORANJE : step === i + 1 ? 'white' : '#E5E7EB',
                  border: `2px solid ${step >= i + 1 ? ORANJE : '#E5E7EB'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 700,
                  color:
                    step > i ? 'white' : step === i + 1 ? ORANJE : '#9CA3AF',
                }}
              >
                {step > i + 1 ? (
                  <Icon name="check" size={12} color="white" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                style={{
                  fontSize: 10,
                  color: step >= i + 1 ? ORANJE : '#9CA3AF',
                  fontWeight: 600,
                }}
              >
                {s}
              </span>
            </div>
            {i < 2 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: step > i + 1 ? ORANJE : '#E5E7EB',
                  marginBottom: 16,
                  marginTop: 0,
                }}
              />
            )}
          </div>
        ))}
      </div>

      <div
        style={{
          background: WHITE,
          borderRadius: 12,
          padding: 14,
          marginBottom: 20,
          border: `1px solid ${ORANJE}20`,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <p style={{ fontSize: 13, color: '#6B7280', margin: 0 }}>
              A pagar por:
            </p>
            <p style={{ fontWeight: 700, fontSize: 14, margin: '2px 0 0' }}>
              {item.name}
            </p>
          </div>
          <span style={{ fontSize: 22, fontWeight: 900, color: ORANJE }}>
            {fmt(item.price)}
          </span>
        </div>
      </div>

      {step === 1 && (
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>
            Escolha o método de pagamento
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {methods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '14px 16px',
                  borderRadius: 12,
                  border: `2px solid ${method === m.id ? ORANJE : '#E5E7EB'}`,
                  background: method === m.id ? WHITE : 'white',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: m.color + '20',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon name={m.icon} size={20} color={m.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontWeight: 700,
                      fontSize: 14,
                      margin: 0,
                      color: '#111',
                    }}
                  >
                    {m.label}
                  </p>
                  <p style={{ fontSize: 12, color: '#6B7280', margin: 0 }}>
                    {m.desc}
                  </p>
                </div>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: `2px solid ${method === m.id ? ORANJE : '#D1D5DB'}`,
                    background: method === m.id ? ORANJE : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {method === m.id && (
                    <Icon name="check" size={10} color="white" />
                  )}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            style={{
              width: '100%',
              marginTop: 20,
              padding: '13px',
              borderRadius: 10,
              background: ORANJE,
              border: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Continuar →
          </button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            Detalhes do pagamento
          </h3>
          {(method === 'multicaixa' ||
            method === 'ekwanza' ||
            method === 'unitel_money') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field
                label="Número de Telemóvel"
                placeholder="+244 9XX XXX XXX"
                icon="phone"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              <div
                style={{
                  background: WHITE,
                  borderRadius: 10,
                  padding: 14,
                  border: `1px solid ${ORANJE}20`,
                }}
              >
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: ORANJE,
                    margin: 0,
                  }}
                >
                  Referência de pagamento
                </p>
                <p
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    letterSpacing: 2,
                    margin: '6px 0 0',
                  }}
                >
                  {Math.floor(Math.random() * 900000000 + 100000000)}
                </p>
                <p
                  style={{ fontSize: 11, color: '#6B7280', margin: '4px 0 0' }}
                >
                  Use esta referência no seu app para confirmar o pagamento
                </p>
              </div>
            </div>
          )}
          {method === 'transferwise' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field
                label="IBAN / Conta"
                placeholder="AO060040000000000000000"
                icon="bank"
                value={form.iban}
                onChange={(v) => setForm((f) => ({ ...f, iban: v }))}
              />
              <div style={{ background: WHITE, borderRadius: 10, padding: 14 }}>
                <p style={{ fontSize: 13, color: '#6B7280' }}>
                  Transfira para:
                </p>
                <p style={{ fontWeight: 700, fontSize: 14 }}>
                  AO060040000001234567890 · Angoverso Lda
                </p>
                <p style={{ fontSize: 13, color: '#6B7280' }}>
                  Referência: <strong>ORD-{Date.now()}</strong>
                </p>
              </div>
            </div>
          )}
          {method === 'visa' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Field
                label="Nome no cartão"
                placeholder="JOÃO SILVA"
                icon="user"
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label="Número do cartão"
                placeholder="4111 1111 1111 1111"
                icon="credit"
                value={form.card}
                onChange={(v) => setForm((f) => ({ ...f, card: v }))}
              />
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 12,
                }}
              >
                <Field
                  label="Validade"
                  placeholder="MM/AA"
                  icon="eye"
                  value={form.expiry}
                  onChange={(v) => setForm((f) => ({ ...f, expiry: v }))}
                />
                <Field
                  label="CVV"
                  placeholder="123"
                  icon="lock"
                  type="password"
                  value={form.cvv}
                  onChange={(v) => setForm((f) => ({ ...f, cvv: v }))}
                />
              </div>
            </div>
          )}
          <button
            onClick={() => setStep(3)}
            style={{
              width: '100%',
              marginTop: 20,
              padding: '13px',
              borderRadius: 10,
              background: ORANJE,
              border: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: 15,
              cursor: 'pointer',
            }}
          >
            Continuar →
          </button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
            Confirmar pagamento
          </h3>
          <div
            style={{
              background: 'white',
              borderRadius: 12,
              padding: 16,
              border: '1px solid #E5E7EB',
              marginBottom: 16,
            }}
          >
            {(
              [
                { l: 'Produto', v: item.name },
                {
                  l: 'Método',
                  v: methods.find((m) => m.id === method)?.label ?? '',
                },
                { l: 'Valor', v: fmt(item.price) },
                { l: 'Taxa', v: '0 Kz' },
                { l: 'Total', v: fmt(item.price), bold: true },
              ] as { l: string; v: string; bold?: boolean }[]
            ).map((r) => (
              <div
                key={r.l}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid #F3F4F6',
                }}
              >
                <span style={{ color: '#6B7280', fontSize: 13 }}>{r.l}</span>
                <span
                  style={{
                    fontWeight: r.bold ? 800 : 600,
                    fontSize: 13,
                    color: r.bold ? ORANJE : '#111',
                  }}
                >
                  {r.v}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setStep(4)}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: 10,
              background: ORANJE,
              border: 'none',
              color: 'white',
              fontWeight: 700,
              fontSize: 16,
              cursor: 'pointer',
            }}
          >
            Confirmar & Pagar {fmt(item.price)}
          </button>
          <p
            style={{
              fontSize: 11,
              color: '#9CA3AF',
              textAlign: 'center',
              marginTop: 10,
            }}
          >
            🔒 Pagamento seguro · Dados encriptados SSL
          </p>
        </div>
      )}
    </div>
  );
}
