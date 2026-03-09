'use client';

import { ORANJE } from '@/constants/costumer';
import { Header } from '../customer/_components/header';
import { View } from '@/types/customer';
import { useState } from 'react';

export function PaymentView() {
  const [view, setView] = useState<View>('shop');
  return (
    <div>
      <Header
        search=""
        setSearch={() => {}}
        //cartCount={cartCount}
        favCount={0}
        onMenu={() => {}}
        goTo={() => {}}
        view={view}
      />

      <div className="fade-in" style={{ maxWidth: 620, margin: '0 auto' }}>
        <div
          style={{
            padding: '20px 16px',
            borderRadius: 12,
            background: '#ECFDF5',
            border: '1px solid #6EE7B7',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <span style={{ fontSize: 22 }}>🛵</span>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#065F46',
              margin: 0,
            }}
          >
            O pagamento é efectuado no momento da entrega.
          </p>
        </div>
      </div>
    </div>
  );
}
