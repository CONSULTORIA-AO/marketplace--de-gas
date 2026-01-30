import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { useAuthStore } from '@/store/authStrore';

// Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CartPage } from '@/pages/CartPage';
// import { ProductDetailPage } from '@/pages/ProductDetailPage';
// import { CheckoutPage } from '@/pages/CheckoutPage';
// import { OrdersPage } from '@/pages/OrdersPage';
// import { ProfilePage } from '@/pages/ProfilePage';
// import { AddressesPage } from '@/pages/AddressesPage';
// import { ResetPasswordPage } from '@/pages/ResetPasswordPage';
// import { ActivateAccountPage } from '@/pages/ActivateAccountPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Componente para rotas protegidas
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          {/* <Route path="/produto/:id" element={<ProductDetailPage />} /> */}
          {/* <Route path="/recuperar-senha" element={<ResetPasswordPage />} /> */}
          {/* <Route path="/ativar-conta/:token" element={<ActivateAccountPage />} /> */}

          {/* Rotas Protegidas */}
          {/* <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/enderecos"
            element={
              <ProtectedRoute>
                <AddressesPage />
              </ProtectedRoute>
            }
          /> */}

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;