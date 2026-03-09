'use client';
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
            background: '#FFF',
            border: '1px solid #FFA500',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}
          className='flex justify-center items-center'
        >
          <span style={{ fontSize: 22 }}>🛵</span>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#FFA500',
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
