import { useAuthStore } from '@/store/authStrore';
import { Navigate } from 'react-router-dom';
import { useAuthToken } from '@/lib/cookie';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { getToken } = useAuthToken();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}