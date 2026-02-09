import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from "@/routes/ProtectedRoute";

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
import NotFound from "@/pages/NotFound";
import { ProductListPage } from "@/pages/ProductListPage";
import { ProductReviewPage } from "@/pages/PoductReviewPage";

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
      <Route path="/avaliacao" element={<ProductReviewPage />} /> 
      <Route 
        path="/carrinho" 
        element={
          
            <CartPage />
          
        } />
      <Route 
        path="/produtos"
        element={
          
          <ProductListPage />
          
        } 
      />
      <Route 
        path="/produto/:id" 
          element={
            
              <ProductDetailsPage />
            
            } />
      <Route
         path="/checkout"
        element={
          
          <CheckoutPage />
          
        }
      />
      <Route
        path="/pedidos"
        element={
          
          <OrdersPage />
        
        }
      />
      <Route
        path="/perfil"
          element={
            
            <ProfilePage />
      
          }
      />
      <Route
        path="/enderecos"
        element={
        
          <AddressesPage />
          
        }
      />

      {/* 404 
      <Route path="*" element={<Navigate to="/" replace />} />*/}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default NavLink;