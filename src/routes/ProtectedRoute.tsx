import { useAuthStore } from '@/hooks/auth';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = useAuthStore((state) => state.session?.token);

  if (!token) {
    return <Navigate to="/iniciar-sessao" replace />;
  }

  return <>{children}</>;
}
