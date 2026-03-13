'use client';

import { useLocation } from 'react-router-dom';
import { useAuthStore } from '@/hooks/auth';
import { AuthHeader } from '../header';
import { Header } from './header';

const NO_HEADER_PATHS = [
  '/iniciar-sessao',
  '/cadastrar',
  '/recuperar-senha',
];

interface SmartHeaderProps {
  search?: string;
  setSearch?: (v: string) => void;
  favCount?: number;
  onMenu?: () => void;
  onSearch?: (term: string) => void;
}

export function SmartHeader({
  search = '',
  setSearch = () => {},
  favCount = 0,
  onMenu = () => {},
  onSearch = () => {},
}: SmartHeaderProps) {

  const { pathname } = useLocation();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const hideHeader = NO_HEADER_PATHS.some((p) => pathname.startsWith(p));

  if (hideHeader) return null;

  if (isAuthenticated) {
    return (
      <AuthHeader
        search={search}
        setSearch={setSearch}
        favCount={favCount}
        onMenu={onMenu}
      />
    );
  }

  return <Header onSearch={onSearch} />;
}