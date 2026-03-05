import { motion } from 'framer-motion';
import type { UseFormReturn } from 'react-hook-form';
import type { CheckoutFormData } from '@/lib/validations';

interface CheckoutFirstStapProps {
  form: UseFormReturn<CheckoutFormData>;
}

const PROVINCIAS = [
  'Luanda',
  'Benguela',
  'Huambo',
  'Lubango',
  'Malanje',
  'Cabinda',
  'Uíge',
  'Soyo',
  'Lobito',
  'Kuito',
  'Saurimo',
  'Dundo',
  "N'dalatando",
  'Sumbe',
  'Ondjiva',
  'Menongue',
  'Lwena',
];

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
}

function Field({ label, error, children, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        className="text-xs font-bold uppercase tracking-widest"
        style={{ color: 'rgba(255,255,255,0.5)' }}
      >
        {label}
        {required && <span style={{ color: '#f97316' }}> *</span>}
      </label>
      {children}
      {error && (
        <span
          className="text-xs font-semibold flex items-center gap-1"
          style={{ color: '#f87171' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 13 }}>
            error
          </span>
          {error}
        </span>
      )}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(249,115,22,0.25)',
  borderRadius: 14,
  color: '#ffffff',
  height: 48,
  padding: '0 16px',
  fontSize: 14,
  fontWeight: 500,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s',
};

const inputFocusStyle = (focused: boolean): React.CSSProperties => ({
  ...inputStyle,
  borderColor: focused ? '#f97316' : 'rgba(249,115,22,0.25)',
  boxShadow: focused ? '0 0 0 3px rgba(249,115,22,0.1)' : 'none',
});

export function CheckoutFirstStap({ form }: CheckoutFirstStapProps) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="rounded-3xl p-7 sm:p-9 space-y-7"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1.5px solid rgba(249,115,22,0.3)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: 'rgba(249,115,22,0.15)',
            border: '1px solid rgba(249,115,22,0.35)',
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{ color: '#f97316', fontSize: 20 }}
          >
            location_on
          </span>
        </div>
        <div>
          <h2 className="text-lg font-extrabold" style={{ color: '#ffffff' }}>
            Endereço de Entrega
          </h2>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            Para onde enviaremos o seu pedido
          </p>
        </div>
      </div>

      <div
        style={{
          height: 1,
          background:
            'linear-gradient(90deg, rgba(249,115,22,0.4), transparent)',
        }}
      />

      {/* Fields grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Rua/Avenida */}
        <div className="sm:col-span-2">
          <Field label="Rua / Avenida" required error={errors.street?.message}>
            <input
              {...register('street')}
              type="text"
              placeholder="Ex: Avenida Brasil"
              style={inputStyle}
              onFocus={(e) =>
                Object.assign(e.target.style, inputFocusStyle(true))
              }
              onBlur={(e) =>
                Object.assign(e.target.style, inputFocusStyle(false))
              }
            />
          </Field>
        </div>

        {/* Número */}
        <Field label="Número" required error={errors.number?.message}>
          <input
            {...register('number')}
            type="text"
            placeholder="Ex: 123"
            style={inputStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle(true))
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputFocusStyle(false))
            }
          />
        </Field>

        {/* Complemento */}
        <Field label="Complemento" error={errors.complement?.message}>
          <input
            {...register('complement')}
            type="text"
            placeholder="Ex: Apto 4B, 2º andar"
            style={inputStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle(true))
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputFocusStyle(false))
            }
          />
        </Field>

        {/* Bairro */}
        <div className="sm:col-span-2">
          <Field label="Bairro" required error={errors.neighborhood?.message}>
            <input
              {...register('neighborhood')}
              type="text"
              placeholder="Ex: Miramar"
              style={inputStyle}
              onFocus={(e) =>
                Object.assign(e.target.style, inputFocusStyle(true))
              }
              onBlur={(e) =>
                Object.assign(e.target.style, inputFocusStyle(false))
              }
            />
          </Field>
        </div>

        {/* Cidade */}
        <Field label="Cidade" required error={errors.city?.message}>
          <input
            {...register('city')}
            type="text"
            placeholder="Ex: Luanda"
            style={inputStyle}
            onFocus={(e) =>
              Object.assign(e.target.style, inputFocusStyle(true))
            }
            onBlur={(e) =>
              Object.assign(e.target.style, inputFocusStyle(false))
            }
          />
        </Field>

        {/* Província */}
        <Field label="Província" required error={errors.province?.message}>
          <select
            {...register('province')}
            style={{
              ...inputStyle,
              cursor: 'pointer',
            }}
            onFocus={(e) =>
              Object.assign(e.target.style, {
                ...inputFocusStyle(true),
                cursor: 'pointer',
              })
            }
            onBlur={(e) =>
              Object.assign(e.target.style, {
                ...inputFocusStyle(false),
                cursor: 'pointer',
              })
            }
          >
            <option value="" style={{ background: '#111' }}>
              Selecionar provincia…
            </option>
            {PROVINCIAS.map((p) => (
              <option key={p} value={p} style={{ background: '#111' }}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        {/* Ponto de referência */}
        <div className="sm:col-span-2">
          <Field label="Ponto de Referência" error={errors.reference?.message}>
            <input
              {...register('reference')}
              type="text"
              placeholder="Ex: Próximo ao Shoprite"
              style={inputStyle}
              onFocus={(e) =>
                Object.assign(e.target.style, inputFocusStyle(true))
              }
              onBlur={(e) =>
                Object.assign(e.target.style, inputFocusStyle(false))
              }
            />
          </Field>
        </div>
      </div>

      {/* Info box */}
      <div
        className="flex items-start gap-3 p-4 rounded-2xl"
        style={{
          background: 'rgba(249,115,22,0.06)',
          border: '1px solid rgba(249,115,22,0.2)',
        }}
      >
        <span
          className="material-symbols-outlined flex-shrink-0 mt-0.5"
          style={{ color: '#f97316', fontSize: 18 }}
        >
          info
        </span>
        <p
          className="text-xs leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          O endereço de entrega deve ser dentro da área de cobertura do Gás
          Rápido. Entregas realizadas em até{' '}
          <strong style={{ color: 'rgba(255,255,255,0.8)' }}>45 minutos</strong>
          .
        </p>
      </div>
    </motion.div>
  );
}
