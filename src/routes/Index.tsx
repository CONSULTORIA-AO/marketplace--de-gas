import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/routes/ProtectedRoute';

// Pages
import Home from '@/app/home/page';
import About from '@/app/(public)/about/info';
import TermsPrivacity from '@/app/(public)/terms_privacity/page';
import { FAQ } from '@/app/(public)/faq/page';
import LoginPage from '@/app/auth/login/page';
import { SignUp } from "@/app/auth/signup/page"
import PasswordRecoveryFlow from '@/app/auth/recoverpassword/page';
import VerifyAccountPage from '@/app/auth/verifyaccount/page';
import NotFoundPage from '@/app/(public)/notfound/page';

const NavLink = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/iniciar-sessao" element={<LoginPage />} />
      <Route path="/cadastro" element={<SignUp />} />

      <Route path="/recuperar-senha" element={<PasswordRecoveryFlow />} />
      <Route path="/ativar-conta/:token" element={<VerifyAccountPage />} />
      <Route path="/sobre-nos" element={<About />} />
      <Route path="/termos&politicas" element={<TermsPrivacity />} />
      <Route path="/perguntas-frequentes" element={<FAQ />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default NavLink;
