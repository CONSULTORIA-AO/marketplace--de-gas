import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function AuthHeader(){
    const navigate = useNavigate();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    const isSignupPage = location.pathname === '/cadastro';


    return(
        <header 
            className="flex items-center justify-between whitespace-nowrap border-b border-border-light px-10 py-4 bg-white border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4 text-primary">
                <div className="size-8">
                    <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_6_543)">
                        <path d="M42.1739 20.1739L27.8261 5.82609C29.1366 7.13663 28.3989 10.1876 26.2002 13.7654C24.8538 15.9564 22.9595 18.3449 20.6522 20.6522C18.3449 22.9595 15.9564 24.8538 13.7654 26.2002C10.1876 28.3989 7.13663 29.1366 5.82609 27.8261L20.1739 42.1739C21.4845 43.4845 24.5355 42.7467 28.1133 40.548C30.3042 39.2016 32.6927 37.3073 35 35C37.3073 32.6927 39.2016 30.3042 40.548 28.1133C42.7467 24.5355 43.4845 21.4845 42.1739 20.1739Z" fill="currentColor"></path>
                        </g>
                        <defs>
                            <clipPath id="clip0_6_543"><rect fill="white" height="48" width="48"></rect></clipPath>
                        </defs>
                    </svg>
                </div>
                <h2 className="text-text-main text-xl font-bold leading-tight tracking-[-0.015em]">GasMarket</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                    <Link className="text-slate-800 text-sm font-medium leading-normal hover:text-[#137fec] transition-colors" to="/">Início</Link>
                    <Link className="text-text-main text-sm font-medium leading-normal hover:text-[#137fec] transition-colors" to="/">Preços</Link>
                </div>
                {isLoginPage && (
                    <Button 
                        onClick={() => navigate('/cadastro')}
                        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-6 bg-[#137fec] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#137fec]/90 transition-all shadow-sm">
                        <span className="truncate">Criar uma conta</span>
                    </Button>
                )}
                {isSignupPage && (
                    <Button 
                        onClick={() => navigate('/login')}
                        className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-[#137fec] text-white text-sm font-bold tracking-tight hover:bg-[#137fec]/90 transition-all">
                        <span>Entrar</span>
                    </Button>
                )}
            </div>
      </header>
    )
}