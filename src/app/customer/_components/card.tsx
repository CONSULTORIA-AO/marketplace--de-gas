'use client';
import { ORANJE, WHITE } from '@/constants/costumer';
import { CardProps } from '@/types/customer';
import { Icon } from './icon';

export function Card({ title, icon, children }: CardProps) {
  return (
    <div
      style={{
        background: 'white',
        borderRadius: 14,
        padding: 20,
        border: '1px solid #F3F4F6',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: WHITE,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name={icon} size={16} color={ORANJE} />
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}
