import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CartPage } from '@/pages/CartPage';
import { ProductDetailsPage } from '@/pages/ProductDetailsPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrdersPage } from '@/pages/OrdersPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { AddressesPage } from '@/pages/AddressPage';
import PasswordRecoveryFlow from '@/pages/PasswordRecoveryFlow';
import { VerifyAccountPage } from '@/pages/VerifyAccountPage';
import NotFound from '@/pages/NotFound';
import { ProductListPage } from '@/pages/ProductListPage';
import { ProductReviewPage } from '@/pages/PoductReviewPage';

const NavLink = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      <Route path="/recuperar-senha" element={<PasswordRecoveryFlow />} />
      <Route path="/ativar-conta/:token" element={<VerifyAccountPage />} />

      {/* Rotas Privadas */}
      <Route
        path="/avaliacao"
        element={
          <ProtectedRoute>
            <ProductReviewPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/carrinho"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produtos"
        element={
          <ProtectedRoute>
            <ProductListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/produto/:id"
        element={
          <ProtectedRoute>
            <ProductDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
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
      />

      {/* 404 
      <Route path="*" element={<Navigate to="/" replace />} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NavLink;
