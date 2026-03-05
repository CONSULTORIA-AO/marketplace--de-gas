import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useState } from 'react';
import {
  profileSchema,
  type ProfileFormData,
  passwordProfileSchema,
  type PasswordProfileFormData,
} from '@/lib/validations';
import { useAuthStore } from '@/store/authStrore';
import { api } from '@/lib/axios';
import { useUserStore } from '@/store/userIfo';
import { motion } from 'framer-motion';

// ── Shared styles ────────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  background: 'rgba(255,255,255,0.04)',
  border: '1.5px solid rgba(249,115,22,0.2)',
  borderRadius: 14,
  color: '#ffffff',
  height: 48,
  padding: '0 16px',
  fontSize: 14,
  fontWeight: 500,
  outline: 'none',
  width: '100%',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-xs font-bold uppercase tracking-widest block"
        style={{ color: 'rgba(255,255,255,0.45)' }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          className="text-xs font-semibold flex items-center gap-1"
          style={{ color: '#f87171' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 12 }}>
            error
          </span>
          {error}
        </p>
      )}
    </div>
  );
}

function StyledInput({
  type = 'text',
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type={type}
      style={{
        ...inputBase,
        borderColor: focused ? '#f97316' : 'rgba(249,115,22,0.2)',
        boxShadow: focused ? '0 0 0 3px rgba(249,115,22,0.1)' : 'none',
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      {...rest}
    />
  );
}

function SubmitButton({
  loading,
  label,
  loadingLabel,
}: {
  loading: boolean;
  label: string;
  loadingLabel: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: loading ? 1 : 1.02 }}
      whileTap={{ scale: loading ? 1 : 0.97 }}
      type="submit"
      disabled={loading}
      className="w-full h-12 rounded-2xl text-sm font-extrabold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
      style={{
        background: loading
          ? 'rgba(249,115,22,0.4)'
          : 'linear-gradient(135deg, #f97316, #ea580c)',
        color: '#ffffff',
        boxShadow: loading ? 'none' : '0 6px 20px rgba(249,115,22,0.3)',
        border: 'none',
      }}
    >
      {loading ? (
        <>
          <span
            className="material-symbols-outlined animate-spin"
            style={{ fontSize: 16 }}
          >
            autorenew
          </span>
          {loadingLabel}
        </>
      ) : (
        <>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
            check_circle
          </span>
          {label}
        </>
      )}
    </motion.button>
  );
}

export function FormsProfile() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const entidade = useAuthStore((state) => state.session.user.id);
  const cliente = useUserStore((state) => state.cliente);
  const { toast } = useToast();

  // Profile form
  const {
    register: rp,
    handleSubmit: hsp,
    formState: { errors: ep },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      nomeCliente: cliente?.nomeCliente ?? '',
      emailCliente: cliente?.emailCliente ?? '',
      telefoneCliente: cliente?.telefoneCliente ?? '',
      telefoneClienteAlt: cliente?.telefoneClienteAlt ?? '',
      enderecoCliente: cliente?.enderecoCliente ?? '',
    },
  });

  // Password form
  const {
    register: rpw,
    handleSubmit: hspw,
    reset: resetPw,
    formState: { errors: epw },
  } = useForm<PasswordProfileFormData>({
    resolver: zodResolver(passwordProfileSchema),
  });

  const notify = (msg: string, error = false) =>
    toast({
      variant: error ? 'destructive' : 'default',
      description: msg,
    });

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      setLoadingProfile(true);
      const res = await api.patch(`clientes/${entidade}`, {
        emailCliente: data.emailCliente,
        nomeCliente: data.nomeCliente,
        telefoneCliente: data.telefoneCliente,
        telefoneClienteAlt: data.telefoneClienteAlt,
        enderecoCliente: data.enderecoCliente,
      });
      notify(res.data.mensagem);
    } catch (err) {
      notify(
        err instanceof AxiosError
          ? err.response?.data?.mensagem
          : 'Erro ao atualizar',
        true
      );
    } finally {
      setLoadingProfile(false);
    }
  };

  const onSubmitPassword = async (data: PasswordProfileFormData) => {
    try {
      setLoadingPassword(true);
      const res = await api.patch(`clientes/${entidade}/alterar-senha`, {
        senha_actual: data.currentPassword,
        senha: data.newPassword,
        confirmar_senha: data.confirmPassword,
      });
      notify(res.data.mensagem);
      resetPw();
    } catch (err) {
      notify(
        err instanceof AxiosError
          ? err.response?.data?.mensagem
          : 'Erro ao alterar senha',
        true
      );
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
      {/* ── Personal info form ── */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        onSubmit={hsp(onSubmitProfile)}
        className="rounded-3xl p-7 space-y-6"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(249,115,22,0.25)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Form header */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(249,115,22,0.15)',
              border: '1px solid rgba(249,115,22,0.35)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: '#f97316', fontSize: 18 }}
            >
              edit_note
            </span>
          </div>
          <div>
            <h2 className="text-lg font-extrabold" style={{ color: '#ffffff' }}>
              Informações Pessoais
            </h2>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Atualize os seus dados de perfil
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

        {/* Fields */}
        <div className="space-y-4">
          <Field label="Nome Completo" error={ep.nomeCliente?.message}>
            <StyledInput {...rp('nomeCliente')} placeholder="O seu nome" />
          </Field>

          <Field label="E-mail" error={ep.emailCliente?.message}>
            <StyledInput
              {...rp('emailCliente')}
              type="email"
              placeholder="email@exemplo.com"
            />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Telefone" error={ep.telefoneCliente?.message}>
              <StyledInput
                {...rp('telefoneCliente')}
                type="tel"
                placeholder="9XX XXX XXX"
              />
            </Field>
            <Field label="Telefone Alt." error={ep.telefoneClienteAlt?.message}>
              <StyledInput
                {...rp('telefoneClienteAlt')}
                type="tel"
                placeholder="9XX XXX XXX"
              />
            </Field>
          </div>

          <Field label="Endereço" error={ep.enderecoCliente?.message}>
            <StyledInput
              {...rp('enderecoCliente')}
              placeholder="Rua, Bairro, Cidade"
            />
          </Field>
        </div>

        <SubmitButton
          loading={loadingProfile}
          label="Guardar Alterações"
          loadingLabel="A guardar…"
        />
      </motion.form>

      {/* ── Security / Password form ── */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.28 }}
        onSubmit={hspw(onSubmitPassword)}
        className="rounded-3xl p-7 space-y-6"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1.5px solid rgba(249,115,22,0.25)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
        }}
      >
        {/* Form header */}
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'rgba(249,115,22,0.15)',
              border: '1px solid rgba(249,115,22,0.35)',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ color: '#f97316', fontSize: 18 }}
            >
              lock_reset
            </span>
          </div>
          <div>
            <h2 className="text-lg font-extrabold" style={{ color: '#ffffff' }}>
              Segurança
            </h2>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Altere a sua palavra-passe
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

        {/* Warning banner */}
        <div
          className="flex items-start gap-3 p-4 rounded-2xl"
          style={{
            background: 'rgba(251,191,36,0.06)',
            border: '1px solid rgba(251,191,36,0.2)',
          }}
        >
          <span
            className="material-symbols-outlined flex-shrink-0 mt-0.5"
            style={{ color: '#fbbf24', fontSize: 16 }}
          >
            info
          </span>
          <p
            className="text-xs leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.45)' }}
          >
            Use uma senha com pelo menos{' '}
            <strong style={{ color: 'rgba(255,255,255,0.8)' }}>
              8 caracteres
            </strong>
            , incluindo letras maiúsculas, números e símbolos.
          </p>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <Field label="Senha Atual" error={epw.currentPassword?.message}>
            <StyledInput
              {...rpw('currentPassword')}
              type="password"
              placeholder="••••••••"
            />
          </Field>

          <Field label="Nova Senha" error={epw.newPassword?.message}>
            <StyledInput
              {...rpw('newPassword')}
              type="password"
              placeholder="••••••••"
            />
          </Field>

          <Field
            label="Confirmar Nova Senha"
            error={epw.confirmPassword?.message}
          >
            <StyledInput
              {...rpw('confirmPassword')}
              type="password"
              placeholder="••••••••"
            />
          </Field>
        </div>

        <SubmitButton
          loading={loadingPassword}
          label="Redefinir Senha"
          loadingLabel="A atualizar…"
        />
      </motion.form>
    </div>
  );
}
