import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-card-light dark:bg-card-dark border-t border-border-light dark:border-border-dark mt-16 border border-slate-300 dark:border-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary text-2xl">
                local_fire_department
              </span>
              <h2 className="text-lg font-bold">GásMarket</h2>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Seu marketplace de gás, conectando você aos melhores fornecedores.
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link className="hover:text-primary" to="#">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="#">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="#">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Ajuda</h3>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link className="hover:text-primary" to="#">
                  FAQ
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="#">
                  Contato
                </Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="#">
                  Seja um Fornecedor
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <Link className="text-gray-500 hover:text-primary" to="#">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link className="text-gray-500 hover:text-primary" to="#">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link className="text-gray-500 hover:text-primary" to="#">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clip-rule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 2.525c.636-.247 1.363-.416 2.427-.465C9.83 2.013 10.185 2 12.315 2zm-1.161 1.043c-1.063.049-1.691.218-2.167.417a3.479 3.479 0 00-1.21 1.21c-.198.476-.368 1.104-.416 2.167-.048 1.024-.06 1.375-.06 3.599s.012 2.575.06 3.599c.049 1.063.218 1.691.416 2.167a3.479 3.479 0 001.21 1.21c.476.198 1.104.368 2.167.416 1.024.048 1.375.06 3.599.06s2.575-.012 3.599-.06c1.063-.049 1.691-.218 2.167-.416a3.479 3.479 0 001.21-1.21c.198-.476.368-1.104.416-2.167.048-1.024.06-1.375.06-3.599s-.012-2.575-.06-3.599c-.049-1.063-.218-1.691-.416-2.167a3.479 3.479 0 00-1.21-1.21c-.476-.198-1.104-.368-2.167-.416-1.024-.048-1.375-.06-3.599-.06s-2.575.012-3.599.06zM12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zM12 14a2 2 0 110-4 2 2 0 010 4zm6-7.25a.75.75 0 100 1.5.75.75 0 000-1.5z"
                    fill-rule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border-light border-slate-300 dark:border-border-dark pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© 2024 GásMarket. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
