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
import PasswordRecoveryFlow from '@/pages/PasswordRecoveryFlow';
import { VerifyAccountPage } from '@/pages/VerifyAccountPage';
import NotFound from '@/pages/NotFound';
import { ProductListPage } from '@/pages/ProductListPage';
import { ProductReviewPage } from '@/pages/PoductReviewPage';
import About from '@/components/about/about';
import TermosPrivacidade from '@/pages/TermosPrivacidade';
import { FAQ } from '@/pages/Faq';

const NavLink = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro" element={<RegisterPage />} />

      <Route path="/recuperar-senha" element={<PasswordRecoveryFlow />} />
      <Route path="/ativar-conta/:token" element={<VerifyAccountPage />} />
      <Route path="/sobre-nos" element={<About />} />
      <Route path="/termos&politicas" element={<TermosPrivacidade />} />
      <Route path="/perguntas-frequentes" element={<FAQ />} />

      {/* Rotas Privadas */}
      <Route
        path="/avaliacao/:id"
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

      {/* 404 
      <Route path="*" element={<Navigate to="/" replace />} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NavLink;
