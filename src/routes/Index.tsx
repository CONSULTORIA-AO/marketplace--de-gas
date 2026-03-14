import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Pages
import Home from '@/app/home/page';
import About from '@/app/(public)/about/info';
import TermsPrivacity from '@/app/(public)/terms_privacity/page';
import { FAQ } from '@/app/(public)/faq/page';
import LoginPage from '@/app/auth/login/page';
import { SignUp } from '@/app/auth/signup/page';
import PasswordRecoveryFlow from '@/app/auth/recoverpassword/page';
import Contact from '@/app/(public)/contact/contact';
import NotFoundPage from '@/app/(public)/notfound/page';
import CartPage from '@/app/cart/page';
import Customer from '@/app/customer/page';
import { CheckoutPage } from '@/app/checkout/page';
import ProfileView from '@/app/profile/page';
import { SettingsView } from '@/app/settings/page';
import { OrdersView } from '@/app/orders/page';
import { ProductDetail } from '@/app/product/page';

const NavLink = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/iniciar-sessao" element={<LoginPage />} />
      <Route path="/cadastrar" element={<SignUp />} />

      <Route path="/recuperar-senha" element={<PasswordRecoveryFlow />} />
      <Route path="/sobre-nos" element={<About />} />
      <Route path="/termos-politicas" element={<TermsPrivacity />} />
      <Route path="/perguntas-frequentes" element={<FAQ />} />
      <Route path="/contacto" element={<Contact />} />

      <Route
        path="/produto/:id"
        element={
            <ProductDetail />
        }
      />

      <Route
        path="/produtos"
        element={
          <Customer />
        }
      />
      <Route path="/carrinho" element={<CartPage />} />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <ProtectedRoute>
            <ProfileView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/definicoes"
        element={
          <ProtectedRoute>
            <SettingsView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pedidos"
        element={
          <ProtectedRoute>
            <OrdersView />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default NavLink;
