'use client';

import { ORANJE, WHITE } from '@/constants/costumer';
import { ProfileViewProps, User } from '@/types/customer';
import { useState } from 'react';
import { Icon } from './icon';

export function ProfileView({ user, setUser, onBack }: ProfileViewProps) {
  const [edit, setEdit] = useState<boolean>(false);
  const [form, setForm] = useState<User>(user);

  const save = (): void => {
    setUser(form);
    setEdit(false);
  };

  const fields: { label: string; key: keyof User; icon: string }[] = [
    { label: 'Nome completo', key: 'name', icon: 'user' },
    { label: 'E-mail', key: 'email', icon: 'bell' },
    { label: 'Telefone', key: 'phone', icon: 'phone' },
    { label: 'Endereço', key: 'address', icon: 'location' },
    { label: 'Cidade', key: 'city', icon: 'location' },
    { label: 'País', key: 'country', icon: 'location' },
  ];

  return (
    <div className="fade-in" style={{ maxWidth: 700, margin: '0 auto' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20,
        }}
      >
        <button
          onClick={onBack}
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <Icon name="back" color={ORANJE} />
        </button>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>Meu Perfil</h2>
        <button
          onClick={edit ? save : () => setEdit(true)}
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 16px',
            borderRadius: 8,
            background: edit ? '#10B981' : ORANJE,
            border: 'none',
            color: 'white',
            fontWeight: 600,
            fontSize: 13,
            cursor: 'pointer',
          }}
        >
          <Icon name={edit ? 'check' : 'edit'} size={14} color="white" />
          {edit ? 'Guardar' : 'Editar'}
        </button>
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: 16,
          padding: 24,
          marginBottom: 16,
          border: '1px solid #F3F4F6',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'inline-block',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 96,
              height: 96,
              borderRadius: '50%',
              overflow: 'hidden',
              border: `4px solid ${ORANJE}`,
              margin: '0 auto',
            }}
          >
            <img
              src={user.avatar}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          {edit && (
            <button
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: ORANJE,
                border: '2px solid white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="edit" size={12} color="white" />
            </button>
          )}
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 800, margin: '0 0 4px' }}>
          {user.name}
        </h3>
        <p style={{ color: '#6B7280', fontSize: 13, margin: '0 0 8px' }}>
          {user.email}
        </p>
        <span
          style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: 20,
            background: WHITE,
            color: ORANJE,
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Plano: {user.plan}
        </span>
        <p style={{ fontSize: 12, color: '#9CA3AF', marginTop: 8 }}>
          Membro desde {user.memberSince}
        </p>
      </div>

      <div
        style={{
          background: 'white',
          borderRadius: 16,
          padding: 24,
          border: '1px solid #F3F4F6',
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 16 }}>
          Informações Pessoais
        </h3>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: 14,
          }}
        >
          {fields.map((f) => (
            <div key={f.key}>
              <label
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: '#374151',
                  display: 'block',
                  marginBottom: 5,
                }}
              >
                {f.label}
              </label>
              <div style={{ position: 'relative' }}>
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                  }}
                >
                  <Icon name={f.icon} size={14} color="#9CA3AF" />
                </div>
                <input
                  value={form[f.key] as string}
                  onChange={(e) =>
                    setForm((fr) => ({ ...fr, [f.key]: e.target.value }))
                  }
                  disabled={!edit}
                  style={{
                    width: '100%',
                    padding: '10px 12px 10px 32px',
                    border: `1.5px solid ${edit ? '#E5E7EB' : 'transparent'}`,
                    borderRadius: 8,
                    fontSize: 13,
                    background: edit ? 'white' : '#F9FAFB',
                    boxSizing: 'border-box',
                    color: '#111',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
